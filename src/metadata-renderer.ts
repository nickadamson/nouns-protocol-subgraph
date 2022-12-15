import {
  WebsiteURIUpdated,
  ContractImageUpdated,
  DescriptionUpdated,
  PropertyAdded,
  AdditionalTokenPropertiesSet,
  RendererBaseUpdated,
} from "../generated/templates/MetadataContract/MetadataRenderer";
import { MetadataContract, Property } from "../generated/schema";

export function handleWebsiteURIUpdated(event: WebsiteURIUpdated): void {
  const metadataAddr = event.address.toHexString();

  let metadataContract = MetadataContract.load(metadataAddr)!;
  metadataContract.websiteURL = event.params.newURI;
  metadataContract.save();
}

export function handleContractImageUpdated(event: ContractImageUpdated): void {
  const metadataAddr = event.address.toHexString();

  let metadataContract = MetadataContract.load(metadataAddr)!;
  metadataContract.contractImage = event.params.newImage;
  metadataContract.save();
}

export function handleDescriptionUpdated(event: DescriptionUpdated): void {
  const metadataAddr = event.address.toHexString();

  let metadataContract = MetadataContract.load(metadataAddr)!;
  metadataContract.description = event.params.newDescription;
  metadataContract.save();
}

export function handlePropertyAdded(event: PropertyAdded): void {
  const metadataAddr = event.address.toHexString();
  const propertyId = event.params.id;
  const propertyName = event.params.name;

  let property = new Property(metadataAddr.concat(`-${propertyId.toI32()}`));
  property.name = propertyName;
  property.metadataContract = metadataAddr;
  property.save();
}

export function handleAdditionalTokenPropertiesSet(
  event: AdditionalTokenPropertiesSet
): void {
  const metadataAddr = event.address.toHexString();
  const newProperties = event.params._additionalJsonProperties;
  const newPropsLength = newProperties.length;

  for (let i = 0; i < newPropsLength; i++) {
    const propertyKey = newProperties[i].key;
    const propertyValue = newProperties[i].value;
    const propertyQuote = newProperties[i].quote;

    let property = new Property(metadataAddr.concat(`-${propertyKey}`));
    property.name = propertyKey;
    property.value = propertyValue;
    property.quote = propertyQuote;
    property.metadataContract = metadataAddr;
    property.save();
  }
}

export function handleRendererBaseUpdated(event: RendererBaseUpdated): void {
  const metadataAddr = event.address.toHexString();

  let metadataContract = MetadataContract.load(metadataAddr)!;
  metadataContract.rendererBase = event.params.newRendererBase;
  metadataContract.save();
}
