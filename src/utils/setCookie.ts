import type { Response } from "express";

export const setAccessTokenCookie = (res: Response, accessToken: string) => {
  res.cookie("accessToken", accessToken, {
    maxAge: 3600000,
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
};
