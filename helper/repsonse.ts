import { NextResponse } from "next/server";

export const restResponse = (
  message: string = "",
  success: boolean = true,
  payload: { [key: string]: any } = {},
  status: number = 200
) => {
  return NextResponse.json(
    {
      message,
      success,
      payload,
    },
    { status }
  );
};
