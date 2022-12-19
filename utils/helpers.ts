import {
  FounderAllocationsClearedNewFoundersStruct,
  MintScheduledFounderStruct,
  Token as TokenContractInstance,
} from "../generated/templates/TokenContract/Token";
import { Account, Auction, AuctionContract, DAOFounder, Delegation, Token, TokenContract } from "../generated/schema";
import { Address, BigInt, store } from "@graphprotocol/graph-ts";

export function findOrCreateAccount(userAddress: string): Account {
  let account = Account.load(userAddress);
  if (account === null) {
    account = new Account(userAddress);
    account.save();
  }
  return account;
}

export function findOrCreateDelegation(
  tokenContractAddr: string,
  voterAddr: string,
  delegatedToAddr: string
): Delegation {
  let delegationId = tokenContractAddr.concat(`-${voterAddr}`);

  let delegation = Delegation.load(delegationId);
  if (delegation === null) {
    // create new
    const voterAccount = findOrCreateAccount(voterAddr);
    const delegatedToAccount = findOrCreateAccount(delegatedToAddr);

    delegation = new Delegation(delegationId);
    delegation.tokenContract = tokenContractAddr;
    delegation.voter = voterAccount.id;
    delegation.delegatedTo = delegatedToAccount.id;
    delegation.save();
  }

  return delegation;
}

export function handleNewFounderMint(newFounder: MintScheduledFounderStruct, tokenContractAddr: string): void {
  const founderAddr = newFounder.wallet.toHexString();
  const ownershipPercentage = newFounder.ownershipPct;
  const vestExpiry = newFounder.vestExpiry;

  const founderAccount = findOrCreateAccount(founderAddr);
  const founderIdString = tokenContractAddr.concat(`-${founderAddr}`);

  let newFounderInfo = new DAOFounder(founderIdString);
  newFounderInfo.ownershipPercentage = BigInt.fromI32(ownershipPercentage);
  newFounderInfo.vestExpiry = vestExpiry;
  newFounderInfo.account = founderAccount.id;
  newFounderInfo.tokenContract = tokenContractAddr;
  newFounderInfo.save();

  // let tokenContract = TokenContract.load(tokenContractAddr)!;
  // let tokenId = tokenContract.totalSupply;
  // if (tokenId !== BigInt.fromI32(0)) {
  //   tokenId = BigInt.fromI32(1).plus(tokenId);
  // }

  // findOrCreateToken(tokenContractAddr, tokenId);

  // tokenContract.totalSupply = tokenId.plus(BigInt.fromI32(1));
  // tokenContract.save();
}

export function handleFoundersUpdated(
  newFounders: FounderAllocationsClearedNewFoundersStruct[],
  tokenContract: TokenContract
): void {
  const oldFounders = tokenContract.founders;
  const oldFoundersLength = oldFounders.length;
  // remove old founders
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
    let newFounderInfo = new DAOFounder(founderIdString);
    newFounderInfo.ownershipPercentage = ownershipPercentage;
    newFounderInfo.vestExpiry = vestExpiry;
    newFounderInfo.account = founderAccount.id;
    newFounderInfo.tokenContract = tokenContract.id;
    newFounderInfo.save();
  }
}

export function handleTokenTotalSupply(tokenContractAddr: string): void {
  // let tokenContract = TokenContract.load(tokenContractAddr)!;
  // const nextTokenId = tokenContract.totalSupply.plus(BigInt.fromI32(1));
  // tokenContract.totalSupply = nextTokenId;
  // tokenContract.save();
  const tokenDeployment = TokenContractInstance.bind(Address.fromString(tokenContractAddr));
  const totalSupply = tokenDeployment.totalSupply();

  let tokenContract = TokenContract.load(tokenContractAddr)!;
  if (totalSupply.gt(tokenContract.totalSupply)) {
    tokenContract.totalSupply = totalSupply;
    tokenContract.save();
  }
}

export function findOrCreateToken(tokenContractAddr: string, tokenId: BigInt): Token {
  let tokenContract = TokenContract.load(tokenContractAddr)!;
  const tokenContractDeployment = TokenContractInstance.bind(Address.fromString(tokenContractAddr));
  const auctionContract = AuctionContract.load(tokenContract.auctionContract)!;
  let auction = findOrCreateAuction(`${auctionContract.id}-${tokenId}`, true, BigInt.fromI32(0), BigInt.fromI32(0));

  const tokenURI = tokenContractDeployment.try_tokenURI(tokenId);

  let token = Token.load(tokenContractAddr.concat(`-${tokenId}`));
  if (token === null) {
    token = new Token(tokenContractAddr.concat(`-${tokenId}`));
    token.tokenId = tokenId;
    if (!tokenURI.reverted) {
      token.tokenURI = tokenURI.value;
    }
    token.tokenContract = tokenContract.id;
    token.auction = auction.id;
    token.save();
  }

  return token;
}

export function findOrCreateAuction(auctionId: string, settled: boolean, startTime: BigInt, endTime: BigInt): Auction {
  let auction = Auction.load(auctionId);

  if (auction === null) {
    auction = new Auction(auctionId);
    auction.settled = settled;
    auction.startTime = startTime;
    auction.endTime = endTime;
    auction.auctionContract = auctionId.slice(0, 42);

    auction.save();
  }

  return auction;
}
