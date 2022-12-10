import {
  AuctionBid as AuctionBidEvent,
  AuctionCreated as AuctionCreatedEvent,
  AuctionSettled as AuctionSettledEvent,
  DurationUpdated as DurationUpdatedEvent,
  AuctionInitialized as AuctionInitializedEvent,
  MinBidIncrementPercentageUpdated as MinBidIncrementPercentageUpdatedEvent,
  AuctionOwnerCanceled as AuctionOwnerCanceledEvent,
  AuctionOwnerPending as AuctionOwnerPendingEvent,
  AuctionOwnerUpdated as AuctionOwnerUpdatedEvent,
  Paused as PausedEvent,
  ReservePriceUpdated as ReservePriceUpdatedEvent,
  TimeBufferUpdated as TimeBufferUpdatedEvent,
  Unpaused as UnpausedEvent,
  AuctionUpgraded as AuctionUpgradedEvent
} from "../generated/Auction/Auction"
import {
  AuctionBid,
  AuctionCreated,
  AuctionSettled,
  DurationUpdated,
  AuctionInitialized,
  MinBidIncrementPercentageUpdated,
  AuctionOwnerCanceled,
  AuctionOwnerPending,
  AuctionOwnerUpdated,
  Paused,
  ReservePriceUpdated,
  TimeBufferUpdated,
  Unpaused,
  AuctionUpgraded
} from "../generated/schema"

export function handleAuctionBid(event: AuctionBidEvent): void {
  let entity = new AuctionBid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.bidder = event.params.bidder
  entity.amount = event.params.amount
  entity.extended = event.params.extended
  entity.endTime = event.params.endTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuctionCreated(event: AuctionCreatedEvent): void {
  let entity = new AuctionCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.startTime = event.params.startTime
  entity.endTime = event.params.endTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuctionSettled(event: AuctionSettledEvent): void {
  let entity = new AuctionSettled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenId = event.params.tokenId
  entity.winner = event.params.winner
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDurationUpdated(event: DurationUpdatedEvent): void {
  let entity = new DurationUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.duration = event.params.duration

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuctionInitialized(event: AuctionInitializedEvent): void {
  let entity = new AuctionInitialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMinBidIncrementPercentageUpdated(
  event: MinBidIncrementPercentageUpdatedEvent
): void {
  let entity = new MinBidIncrementPercentageUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.minBidIncrementPercentage = event.params.minBidIncrementPercentage

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuctionOwnerCanceled(
  event: AuctionOwnerCanceledEvent
): void {
  let entity = new AuctionOwnerCanceled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.canceledOwner = event.params.canceledOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuctionOwnerPending(
  event: AuctionOwnerPendingEvent
): void {
  let entity = new AuctionOwnerPending(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.pendingOwner = event.params.pendingOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuctionOwnerUpdated(
  event: AuctionOwnerUpdatedEvent
): void {
  let entity = new AuctionOwnerUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.prevOwner = event.params.prevOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReservePriceUpdated(
  event: ReservePriceUpdatedEvent
): void {
  let entity = new ReservePriceUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.reservePrice = event.params.reservePrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTimeBufferUpdated(event: TimeBufferUpdatedEvent): void {
  let entity = new TimeBufferUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.timeBuffer = event.params.timeBuffer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAuctionUpgraded(event: AuctionUpgradedEvent): void {
  let entity = new AuctionUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.impl = event.params.impl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
