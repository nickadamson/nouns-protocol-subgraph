// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AuctionBid extends ethereum.Event {
  get params(): AuctionBid__Params {
    return new AuctionBid__Params(this);
  }
}

export class AuctionBid__Params {
  _event: AuctionBid;

  constructor(event: AuctionBid) {
    this._event = event;
  }

  get tokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get bidder(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get extended(): boolean {
    return this._event.parameters[3].value.toBoolean();
  }

  get endTime(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class AuctionCreated extends ethereum.Event {
  get params(): AuctionCreated__Params {
    return new AuctionCreated__Params(this);
  }
}

export class AuctionCreated__Params {
  _event: AuctionCreated;

  constructor(event: AuctionCreated) {
    this._event = event;
  }

  get tokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get startTime(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get endTime(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class AuctionSettled extends ethereum.Event {
  get params(): AuctionSettled__Params {
    return new AuctionSettled__Params(this);
  }
}

export class AuctionSettled__Params {
  _event: AuctionSettled;

  constructor(event: AuctionSettled) {
    this._event = event;
  }

  get tokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get winner(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class DurationUpdated extends ethereum.Event {
  get params(): DurationUpdated__Params {
    return new DurationUpdated__Params(this);
  }
}

export class DurationUpdated__Params {
  _event: DurationUpdated;

  constructor(event: DurationUpdated) {
    this._event = event;
  }

  get duration(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class AuctionInitialized extends ethereum.Event {
  get params(): AuctionInitialized__Params {
    return new AuctionInitialized__Params(this);
  }
}

export class AuctionInitialized__Params {
  _event: AuctionInitialized;

  constructor(event: AuctionInitialized) {
    this._event = event;
  }

  get version(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class MinBidIncrementPercentageUpdated extends ethereum.Event {
  get params(): MinBidIncrementPercentageUpdated__Params {
    return new MinBidIncrementPercentageUpdated__Params(this);
  }
}

export class MinBidIncrementPercentageUpdated__Params {
  _event: MinBidIncrementPercentageUpdated;

  constructor(event: MinBidIncrementPercentageUpdated) {
    this._event = event;
  }

  get minBidIncrementPercentage(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class AuctionOwnerCanceled extends ethereum.Event {
  get params(): AuctionOwnerCanceled__Params {
    return new AuctionOwnerCanceled__Params(this);
  }
}

export class AuctionOwnerCanceled__Params {
  _event: AuctionOwnerCanceled;

  constructor(event: AuctionOwnerCanceled) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get canceledOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class AuctionOwnerPending extends ethereum.Event {
  get params(): AuctionOwnerPending__Params {
    return new AuctionOwnerPending__Params(this);
  }
}

export class AuctionOwnerPending__Params {
  _event: AuctionOwnerPending;

  constructor(event: AuctionOwnerPending) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get pendingOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class AuctionOwnerUpdated extends ethereum.Event {
  get params(): AuctionOwnerUpdated__Params {
    return new AuctionOwnerUpdated__Params(this);
  }
}

export class AuctionOwnerUpdated__Params {
  _event: AuctionOwnerUpdated;

  constructor(event: AuctionOwnerUpdated) {
    this._event = event;
  }

  get prevOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Paused extends ethereum.Event {
  get params(): Paused__Params {
    return new Paused__Params(this);
  }
}

export class Paused__Params {
  _event: Paused;

  constructor(event: Paused) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ReservePriceUpdated extends ethereum.Event {
  get params(): ReservePriceUpdated__Params {
    return new ReservePriceUpdated__Params(this);
  }
}

export class ReservePriceUpdated__Params {
  _event: ReservePriceUpdated;

  constructor(event: ReservePriceUpdated) {
    this._event = event;
  }

  get reservePrice(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class TimeBufferUpdated extends ethereum.Event {
  get params(): TimeBufferUpdated__Params {
    return new TimeBufferUpdated__Params(this);
  }
}

export class TimeBufferUpdated__Params {
  _event: TimeBufferUpdated;

  constructor(event: TimeBufferUpdated) {
    this._event = event;
  }

  get timeBuffer(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class Unpaused extends ethereum.Event {
  get params(): Unpaused__Params {
    return new Unpaused__Params(this);
  }
}

export class Unpaused__Params {
  _event: Unpaused;

  constructor(event: Unpaused) {
    this._event = event;
  }

  get user(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class AuctionUpgraded extends ethereum.Event {
  get params(): AuctionUpgraded__Params {
    return new AuctionUpgraded__Params(this);
  }
}

export class AuctionUpgraded__Params {
  _event: AuctionUpgraded;

  constructor(event: AuctionUpgraded) {
    this._event = event;
  }

  get impl(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Auction__auctionResult {
  value0: BigInt;
  value1: BigInt;
  value2: Address;
  value3: BigInt;
  value4: BigInt;
  value5: boolean;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: Address,
    value3: BigInt,
    value4: BigInt,
    value5: boolean
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromAddress(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromBoolean(this.value5));
    return map;
  }

  getTokenId(): BigInt {
    return this.value0;
  }

  getHighestBid(): BigInt {
    return this.value1;
  }

  getHighestBidder(): Address {
    return this.value2;
  }

  getStartTime(): BigInt {
    return this.value3;
  }

  getEndTime(): BigInt {
    return this.value4;
  }

  getSettled(): boolean {
    return this.value5;
  }
}

export class Auction extends ethereum.SmartContract {
  static bind(address: Address): Auction {
    return new Auction("Auction", address);
  }

  auction(): Auction__auctionResult {
    let result = super.call(
      "auction",
      "auction():(uint256,uint256,address,uint40,uint40,bool)",
      []
    );

    return new Auction__auctionResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toAddress(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBoolean()
    );
  }

  try_auction(): ethereum.CallResult<Auction__auctionResult> {
    let result = super.tryCall(
      "auction",
      "auction():(uint256,uint256,address,uint40,uint40,bool)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Auction__auctionResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toAddress(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBoolean()
      )
    );
  }

  duration(): BigInt {
    let result = super.call("duration", "duration():(uint256)", []);

    return result[0].toBigInt();
  }

  try_duration(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("duration", "duration():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  minBidIncrement(): BigInt {
    let result = super.call(
      "minBidIncrement",
      "minBidIncrement():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_minBidIncrement(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "minBidIncrement",
      "minBidIncrement():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  paused(): boolean {
    let result = super.call("paused", "paused():(bool)", []);

    return result[0].toBoolean();
  }

  try_paused(): ethereum.CallResult<boolean> {
    let result = super.tryCall("paused", "paused():(bool)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  pendingOwner(): Address {
    let result = super.call("pendingOwner", "pendingOwner():(address)", []);

    return result[0].toAddress();
  }

  try_pendingOwner(): ethereum.CallResult<Address> {
    let result = super.tryCall("pendingOwner", "pendingOwner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  proxiableUUID(): Bytes {
    let result = super.call("proxiableUUID", "proxiableUUID():(bytes32)", []);

    return result[0].toBytes();
  }

  try_proxiableUUID(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "proxiableUUID",
      "proxiableUUID():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  reservePrice(): BigInt {
    let result = super.call("reservePrice", "reservePrice():(uint256)", []);

    return result[0].toBigInt();
  }

  try_reservePrice(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("reservePrice", "reservePrice():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  timeBuffer(): BigInt {
    let result = super.call("timeBuffer", "timeBuffer():(uint256)", []);

    return result[0].toBigInt();
  }

  try_timeBuffer(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("timeBuffer", "timeBuffer():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  token(): Address {
    let result = super.call("token", "token():(address)", []);

    return result[0].toAddress();
  }

  try_token(): ethereum.CallResult<Address> {
    let result = super.tryCall("token", "token():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  treasury(): Address {
    let result = super.call("treasury", "treasury():(address)", []);

    return result[0].toAddress();
  }

  try_treasury(): ethereum.CallResult<Address> {
    let result = super.tryCall("treasury", "treasury():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _manager(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _weth(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AcceptOwnershipCall extends ethereum.Call {
  get inputs(): AcceptOwnershipCall__Inputs {
    return new AcceptOwnershipCall__Inputs(this);
  }

  get outputs(): AcceptOwnershipCall__Outputs {
    return new AcceptOwnershipCall__Outputs(this);
  }
}

export class AcceptOwnershipCall__Inputs {
  _call: AcceptOwnershipCall;

  constructor(call: AcceptOwnershipCall) {
    this._call = call;
  }
}

export class AcceptOwnershipCall__Outputs {
  _call: AcceptOwnershipCall;

  constructor(call: AcceptOwnershipCall) {
    this._call = call;
  }
}

export class CancelOwnershipTransferCall extends ethereum.Call {
  get inputs(): CancelOwnershipTransferCall__Inputs {
    return new CancelOwnershipTransferCall__Inputs(this);
  }

  get outputs(): CancelOwnershipTransferCall__Outputs {
    return new CancelOwnershipTransferCall__Outputs(this);
  }
}

export class CancelOwnershipTransferCall__Inputs {
  _call: CancelOwnershipTransferCall;

  constructor(call: CancelOwnershipTransferCall) {
    this._call = call;
  }
}

export class CancelOwnershipTransferCall__Outputs {
  _call: CancelOwnershipTransferCall;

  constructor(call: CancelOwnershipTransferCall) {
    this._call = call;
  }
}

export class CreateBidCall extends ethereum.Call {
  get inputs(): CreateBidCall__Inputs {
    return new CreateBidCall__Inputs(this);
  }

  get outputs(): CreateBidCall__Outputs {
    return new CreateBidCall__Outputs(this);
  }
}

export class CreateBidCall__Inputs {
  _call: CreateBidCall;

  constructor(call: CreateBidCall) {
    this._call = call;
  }

  get _tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class CreateBidCall__Outputs {
  _call: CreateBidCall;

  constructor(call: CreateBidCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _founder(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _treasury(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _duration(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _reservePrice(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class PauseCall extends ethereum.Call {
  get inputs(): PauseCall__Inputs {
    return new PauseCall__Inputs(this);
  }

  get outputs(): PauseCall__Outputs {
    return new PauseCall__Outputs(this);
  }
}

export class PauseCall__Inputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class PauseCall__Outputs {
  _call: PauseCall;

  constructor(call: PauseCall) {
    this._call = call;
  }
}

export class SafeTransferOwnershipCall extends ethereum.Call {
  get inputs(): SafeTransferOwnershipCall__Inputs {
    return new SafeTransferOwnershipCall__Inputs(this);
  }

  get outputs(): SafeTransferOwnershipCall__Outputs {
    return new SafeTransferOwnershipCall__Outputs(this);
  }
}

export class SafeTransferOwnershipCall__Inputs {
  _call: SafeTransferOwnershipCall;

  constructor(call: SafeTransferOwnershipCall) {
    this._call = call;
  }

  get _newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SafeTransferOwnershipCall__Outputs {
  _call: SafeTransferOwnershipCall;

  constructor(call: SafeTransferOwnershipCall) {
    this._call = call;
  }
}

export class SetDurationCall extends ethereum.Call {
  get inputs(): SetDurationCall__Inputs {
    return new SetDurationCall__Inputs(this);
  }

  get outputs(): SetDurationCall__Outputs {
    return new SetDurationCall__Outputs(this);
  }
}

export class SetDurationCall__Inputs {
  _call: SetDurationCall;

  constructor(call: SetDurationCall) {
    this._call = call;
  }

  get _duration(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetDurationCall__Outputs {
  _call: SetDurationCall;

  constructor(call: SetDurationCall) {
    this._call = call;
  }
}

export class SetMinimumBidIncrementCall extends ethereum.Call {
  get inputs(): SetMinimumBidIncrementCall__Inputs {
    return new SetMinimumBidIncrementCall__Inputs(this);
  }

  get outputs(): SetMinimumBidIncrementCall__Outputs {
    return new SetMinimumBidIncrementCall__Outputs(this);
  }
}

export class SetMinimumBidIncrementCall__Inputs {
  _call: SetMinimumBidIncrementCall;

  constructor(call: SetMinimumBidIncrementCall) {
    this._call = call;
  }

  get _percentage(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetMinimumBidIncrementCall__Outputs {
  _call: SetMinimumBidIncrementCall;

  constructor(call: SetMinimumBidIncrementCall) {
    this._call = call;
  }
}

export class SetReservePriceCall extends ethereum.Call {
  get inputs(): SetReservePriceCall__Inputs {
    return new SetReservePriceCall__Inputs(this);
  }

  get outputs(): SetReservePriceCall__Outputs {
    return new SetReservePriceCall__Outputs(this);
  }
}

export class SetReservePriceCall__Inputs {
  _call: SetReservePriceCall;

  constructor(call: SetReservePriceCall) {
    this._call = call;
  }

  get _reservePrice(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetReservePriceCall__Outputs {
  _call: SetReservePriceCall;

  constructor(call: SetReservePriceCall) {
    this._call = call;
  }
}

export class SetTimeBufferCall extends ethereum.Call {
  get inputs(): SetTimeBufferCall__Inputs {
    return new SetTimeBufferCall__Inputs(this);
  }

  get outputs(): SetTimeBufferCall__Outputs {
    return new SetTimeBufferCall__Outputs(this);
  }
}

export class SetTimeBufferCall__Inputs {
  _call: SetTimeBufferCall;

  constructor(call: SetTimeBufferCall) {
    this._call = call;
  }

  get _timeBuffer(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetTimeBufferCall__Outputs {
  _call: SetTimeBufferCall;

  constructor(call: SetTimeBufferCall) {
    this._call = call;
  }
}

export class SettleAuctionCall extends ethereum.Call {
  get inputs(): SettleAuctionCall__Inputs {
    return new SettleAuctionCall__Inputs(this);
  }

  get outputs(): SettleAuctionCall__Outputs {
    return new SettleAuctionCall__Outputs(this);
  }
}

export class SettleAuctionCall__Inputs {
  _call: SettleAuctionCall;

  constructor(call: SettleAuctionCall) {
    this._call = call;
  }
}

export class SettleAuctionCall__Outputs {
  _call: SettleAuctionCall;

  constructor(call: SettleAuctionCall) {
    this._call = call;
  }
}

export class SettleCurrentAndCreateNewAuctionCall extends ethereum.Call {
  get inputs(): SettleCurrentAndCreateNewAuctionCall__Inputs {
    return new SettleCurrentAndCreateNewAuctionCall__Inputs(this);
  }

  get outputs(): SettleCurrentAndCreateNewAuctionCall__Outputs {
    return new SettleCurrentAndCreateNewAuctionCall__Outputs(this);
  }
}

export class SettleCurrentAndCreateNewAuctionCall__Inputs {
  _call: SettleCurrentAndCreateNewAuctionCall;

  constructor(call: SettleCurrentAndCreateNewAuctionCall) {
    this._call = call;
  }
}

export class SettleCurrentAndCreateNewAuctionCall__Outputs {
  _call: SettleCurrentAndCreateNewAuctionCall;

  constructor(call: SettleCurrentAndCreateNewAuctionCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get _newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}

export class UnpauseCall extends ethereum.Call {
  get inputs(): UnpauseCall__Inputs {
    return new UnpauseCall__Inputs(this);
  }

  get outputs(): UnpauseCall__Outputs {
    return new UnpauseCall__Outputs(this);
  }
}

export class UnpauseCall__Inputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UnpauseCall__Outputs {
  _call: UnpauseCall;

  constructor(call: UnpauseCall) {
    this._call = call;
  }
}

export class UpgradeToCall extends ethereum.Call {
  get inputs(): UpgradeToCall__Inputs {
    return new UpgradeToCall__Inputs(this);
  }

  get outputs(): UpgradeToCall__Outputs {
    return new UpgradeToCall__Outputs(this);
  }
}

export class UpgradeToCall__Inputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }

  get _newImpl(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpgradeToCall__Outputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }
}

export class UpgradeToAndCallCall extends ethereum.Call {
  get inputs(): UpgradeToAndCallCall__Inputs {
    return new UpgradeToAndCallCall__Inputs(this);
  }

  get outputs(): UpgradeToAndCallCall__Outputs {
    return new UpgradeToAndCallCall__Outputs(this);
  }
}

export class UpgradeToAndCallCall__Inputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }

  get _newImpl(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class UpgradeToAndCallCall__Outputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }
}
