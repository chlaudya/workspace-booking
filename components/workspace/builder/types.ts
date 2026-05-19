export type BookingPhase =
  | "idle"
  | "request-sent"
  | "host-confirmed"
  | "hold-authorized"
  | "contract-signed"
  | "key-handoff";

export type CheckoutFlow =
  | "review"
  | "authorizing"
  | "confirmed"
  | "contract"
  | "signing"
  | "signed";

export type PricingSummary = {
  baseWeeklyPrice: number;
  serviceFee: number;
  refundableDeposit: number;
  weeklyTotal: number;
  itemCount: number;
};

export type PlacedWorkspaceItem = {
  id: string;
  product: {
    id: string;
    name: string;
    image: string;
    pricePerWeek: number;
  };
};
