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
  let property = new Property(`${metadataAddr}-${event.params.id}`);
  property.metadataContract = metadataAddr;
  property.name = event.params.name;
  property.save();
  // TODO
  //   let metadataContract = MetadataContract.load(metadataAddr)!;
  //   metadataContract.websiteURL = event.params.;
  //   metadataContract.save();
}
export function handleAdditionalTokenPropertiesSet(
  event: AdditionalTokenPropertiesSet
): void {
  const metadataAddr = event.address.toHexString();
  const newProperties = event.params._additionalJsonProperties;
  // TODO
  //   let metadataContract = MetadataContract.load(metadataAddr)!;
  //   metadataContract. =
  //   metadataContract.save();
}
export function handleRendererBaseUpdated(event: RendererBaseUpdated): void {
  const metadataAddr = event.address.toHexString();
  let metadataContract = MetadataContract.load(metadataAddr)!;
  metadataContract.rendererBase = event.params.newRendererBase;
  metadataContract.save();
}
