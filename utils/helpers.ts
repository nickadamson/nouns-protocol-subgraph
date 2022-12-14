import {
  FounderAllocationsClearedNewFoundersStruct,
  Token__getFoundersResultValue0Struct,
} from "../generated/templates/TokenContract/Token";
import { Account, FounderInfo, TokenContract } from "../generated/schema";
import { BigInt, store } from "@graphprotocol/graph-ts";

export function findOrCreateAccount(userAddress: string): Account {
  let account = Account.load(userAddress);
  if (account === null) {
    account = new Account(userAddress);
    account.save();
  }
  return account;
}

export function handleNewFounders(
  newFounders: FounderAllocationsClearedNewFoundersStruct[],
  tokenContract: TokenContract
): void {
  const oldFounders = tokenContract.founders;
  const oldFoundersLength = oldFounders.length;

  for (let i = 0; i < oldFoundersLength; i++) {
    const founderId = oldFounders[i];
    store.remove("FounderInfo", founderId);
  }

  const newFoundersLength = newFounders.length;
  for (let i = 0; i < newFoundersLength; i++) {
    const founderAddr = newFounders[i].wallet.toHexString();
    const founderAccount = findOrCreateAccount(founderAddr);
    const ownershipPercentage = newFounders[i].ownershipPct;
    const vestExpiry = newFounders[i].vestExpiry;
    const founderIdString = `${tokenContract.id}-${founderAddr}`;
    let newFounderInfo = new FounderInfo(founderIdString);
    newFounderInfo.ownershipPercentage = ownershipPercentage;
    newFounderInfo.vestExpiry = vestExpiry;
    newFounderInfo.account = founderAccount.id;
    newFounderInfo.tokenContract = tokenContract.id;
    newFounderInfo.save();
  }
}

export function handleFounders(
  founders: Token__getFoundersResultValue0Struct[],
  tokenContract: TokenContract
): void {
  const foundersLength = founders.length;
  for (let i = 0; i < foundersLength; i++) {
    const founderAddr = founders[i].wallet.toHexString();
    const founderAccount = findOrCreateAccount(founderAddr);
    const ownershipPercentage = founders[i].ownershipPct;
    const vestExpiry = founders[i].vestExpiry;
    const founderIdString = `${tokenContract.id}-${founderAddr}`;
    let newFounderInfo = new FounderInfo(founderIdString);
    newFounderInfo.ownershipPercentage = BigInt.fromI32(ownershipPercentage);
    newFounderInfo.vestExpiry = vestExpiry;
    newFounderInfo.account = founderAccount.id;
    newFounderInfo.tokenContract = tokenContract.id;
    newFounderInfo.save();
  }
}
