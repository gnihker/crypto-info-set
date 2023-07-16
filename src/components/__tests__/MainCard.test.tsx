import "@testing-library/jest-dom";

import React from "react";
import { coinGecko } from "../../apis/api";

import axios from "axios";
import moment from "moment";
jest.mock("axios");

describe("coinList", () => {
  describe("when API call is successful", () => {
    it("should return coin list", async () => {
      const data = [
        {
          id: "01coin",
          symbol: "zoc",
          name: "01coin",
          platforms: {},
        },
      ];
      (axios.get as jest.Mock).mockResolvedValue(data);

      const result = await coinGecko.coinList();

      expect(axios.get).toHaveBeenCalledWith(
        `https://api.coingecko.com/api/v3/coins/list?include_platform=true`
      );
      expect(result).toEqual(data);
    });
  });
});

describe("coinHistory", () => {
  describe("when API call is successful", () => {
    it("should return coin info", async () => {
      const data = [
        {
          id: "0xauto-io-contract-auto-deployer",
          symbol: "0xa",
          name: "0xAuto.io : Contract Auto Deployer",
          localization: {
            en: "0xAuto.io : Contract Auto Deployer",
          },
          image: {
            thumb:
              "https://assets.coingecko.com/coins/images/30673/thumb/photo_2023-06-01_11-19-59_%282%29.jpg?1686211837",
          },
        },
      ];
      (axios.get as jest.Mock).mockResolvedValue(data);

      const id = "0xauto-io-contract-auto-deployer";
      const date = moment(new Date()).format("DD-MM-YYYY");
      const result = await coinGecko.coinHistory(id, date);

      expect(axios.get).toHaveBeenCalledWith(
        `https://api.coingecko.com/api/v3/coins/${id}/history?date=${date}`
      );
      expect(result).toEqual(data);
    });
  });
});
