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
} from "../generated/templates/Auction/Auction";
import {
  Account,
  Auction,
  AuctionBid,
  AuctionContract,
} from "../generated/schema";
import { findOrCreateAccount } from "./manager-impl";

export function handleAuctionCreated(event: AuctionCreated): void {
  const auctionContractAddr = event.address.toHexString();
  const tokenId = event.params.tokenId;

  let newAuction = new Auction(`${auctionContractAddr}-${tokenId.toString()}`);
  newAuction.settled = false;
  newAuction.startTime = event.params.startTime;
  newAuction.endTime = event.params.endTime;
  newAuction.auctionContract = auctionContractAddr;
  newAuction.save();
}
export function handleAuctionBid(event: AuctionBidEvent): void {
  const auctionContractAddr = event.address.toHexString();
  const tokenId = event.params.tokenId;
  const amount = event.params.amount;

  let auction = Auction.load(`${auctionContractAddr}-${tokenId.toString()}`)!;
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
  newBid.blockNumber = event.block.number;
  newBid.blockTimestamp = event.block.timestamp;
  newBid.save();
}
export function handleAuctionSettled(event: AuctionSettled): void {
  const auctionContractAddr = event.address.toHexString();
  const tokenId = event.params.tokenId;
  const winnerAddr = event.params.winner.toHexString();

  let winner = Account.load(winnerAddr)!;
  let auction = Auction.load(`${auctionContractAddr}-${tokenId.toString()}`)!;

  auction.winner = winner.id;
  auction.endTime = event.block.timestamp;
  auction.save();
}
export function handleDurationUpdated(event: DurationUpdated): void {
  const auctionContractAddr = event.address.toHexString();
  let auctionContract = AuctionContract.load(auctionContractAddr)!;
  auctionContract.duration = event.params.duration;
  auctionContract.save();
}
export function handleMinBidIncrementPercentageUpdated(
  event: MinBidIncrementPercentageUpdated
): void {
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
export function handleAuctionOwnerUpdated(event: AuctionOwnerUpdated): void {}
