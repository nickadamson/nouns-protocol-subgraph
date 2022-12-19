import {
  AuctionCreated,
  AuctionBid as AuctionBidEvent,
  AuctionOwnerUpdated,
  AuctionSettled,
  DurationUpdated,
  MinBidIncrementPercentageUpdated,
  Paused,
  ReservePriceUpdated,
  TimeBufferUpdated,
  Unpaused,
} from "../generated/templates/AuctionContract/Auction";
import { Auction, AuctionBid, AuctionContract, Token, TokenContract } from "../generated/schema";
import { Token as TokenContractInstance } from "../generated/templates/TokenContract/Token";
import { findOrCreateAccount, findOrCreateAuction, findOrCreateToken, handleTokenTotalSupply } from "../utils/helpers";
import { Address } from "@graphprotocol/graph-ts";

export function handleAuctionCreated(event: AuctionCreated): void {
  const auctionContractAddr = event.address.toHexString();
  const tokenId = event.params.tokenId;
  const auctionContract = AuctionContract.load(auctionContractAddr)!;
  const tokenContractAddr = auctionContract.tokenContract;
  const tokenContractDeployment = TokenContractInstance.bind(Address.fromString(tokenContractAddr));

  let newAuction = new Auction(auctionContractAddr.concat(`-${tokenId.toString()}`));
  newAuction.settled = false;
  newAuction.startTime = event.params.startTime;
  newAuction.endTime = event.params.endTime;
  newAuction.auctionContract = auctionContractAddr;
  newAuction.save();

  let token = findOrCreateToken(tokenContractAddr, tokenId);
  let tokenContract = TokenContract.load(auctionContract.tokenContract)!;
  let newToken = new Token(tokenContract.id.concat(`-${tokenId}`));
  newToken.tokenId = tokenId;
  newToken.auction = newAuction.id;
  newToken.tokenURI = tokenContractDeployment.tokenURI(tokenId);
  newToken.tokenContract = tokenContract.id;
  newToken.save();

  handleTokenTotalSupply(auctionContract.tokenContract);
}

export function handleAuctionBid(event: AuctionBidEvent): void {
  const auctionContractAddr = event.address.toHexString();
  const tokenId = event.params.tokenId;
  const amount = event.params.amount;

  let auction = Auction.load(auctionContractAddr.concat(`-${tokenId.toString()}`))!;
  auction.endTime = event.params.endTime;
  auction.winningBid = event.transaction.hash.toHexString();
  auction.save();

  const bidderAddr = event.params.bidder.toHexString();
  const bidder = findOrCreateAccount(bidderAddr);

  let newBid = new AuctionBid(event.transaction.hash.toHexString());
  newBid.auction = auction.id;
  newBid.bidder = bidder.id;
  newBid.amount = amount;
  newBid.extended = event.params.extended;
  newBid.blockTimestamp = event.block.timestamp;
  newBid.save();
}

export function handleAuctionSettled(event: AuctionSettled): void {
  const auctionContractAddr = event.address.toHexString();
  const tokenId = event.params.tokenId;
  const winnerAddr = event.params.winner.toHexString();
  const auctionContract = AuctionContract.load(auctionContractAddr)!;
  const tokenContractAddr = auctionContract.tokenContract;

  let auction = Auction.load(auctionContractAddr.concat(`-${tokenId.toString()}`))!;
  auction.settled = true;
  auction.winner = winnerAddr;
  auction.endTime = event.block.timestamp;
  auction.save();

  let token = findOrCreateToken(tokenContractAddr, tokenId);
  // let token = Token.load(tokenContractAddr.concat(`-${tokenId}`))!;
  token.owner = winnerAddr;
  token.save();
}

export function handleDurationUpdated(event: DurationUpdated): void {
  const auctionContractAddr = event.address.toHexString();

  let auctionContract = AuctionContract.load(auctionContractAddr)!;
  auctionContract.duration = event.params.duration;
  auctionContract.save();
}

export function handleMinBidIncrementPercentageUpdated(event: MinBidIncrementPercentageUpdated): void {
  const auctionContractAddr = event.address.toHexString();

  let auctionContract = AuctionContract.load(auctionContractAddr)!;
  auctionContract.minBidIncrement = event.params.minBidIncrementPercentage;
  auctionContract.save();
}

export function handleReservePriceUpdated(event: ReservePriceUpdated): void {
  const auctionContractAddr = event.address.toHexString();

  let auctionContract = AuctionContract.load(auctionContractAddr)!;
  auctionContract.reservePrice = event.params.reservePrice;
  auctionContract.save();
}

export function handleTimeBufferUpdated(event: TimeBufferUpdated): void {
  const auctionContractAddr = event.address.toHexString();

  let auctionContract = AuctionContract.load(auctionContractAddr)!;
  auctionContract.timeBuffer = event.params.timeBuffer;
  auctionContract.save();
}

export function handlePaused(event: Paused): void {
  const auctionContractAddr = event.address.toHexString();

  let auctionContract = AuctionContract.load(auctionContractAddr)!;
  auctionContract.paused = true;
  auctionContract.save();
}

export function handleUnpaused(event: Unpaused): void {
  const auctionContractAddr = event.address.toHexString();

  let auctionContract = AuctionContract.load(auctionContractAddr)!;
  auctionContract.paused = false;
  auctionContract.save();
}

export function handleAuctionOwnerUpdated(event: AuctionOwnerUpdated): void {
  const auctionAddr = event.address.toHexString();
  const newOwner = event.params.newOwner.toHexString();

  let auctionContract = AuctionContract.load(auctionAddr)!;
  auctionContract.owner = newOwner;
  auctionContract.save();
}
