import { useEffect, useState } from "react";
import { coinGecko } from "../apis/api";
import { Card, Divider, Empty } from "antd";
import moment from "moment";
import DisplayCurrency from "./DisplayCurrency";
import { CoinHistoricalInfo, CoinInfo } from "./Interface";
import _ from "lodash";
import SearchFilter from "./SearchFilter";

function MainCard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [coinList, setCoinList] = useState<Array<CoinInfo>>([]);
  const [oldCoinInfo, setOldCoinInfo] = useState<CoinHistoricalInfo>({});
  const [currentCoinInfo, setCurrentCoinInfo] = useState<CoinHistoricalInfo>(
    {}
  );

  useEffect(() => {
    loadInitData();
  }, []);

  const loadInitData = async () => {
    try {
      setLoading(true);

      await coinGecko.coinList().then((res) => {
        const filteredItems = res.data.filter(
          (item: any) => !!item.platforms.ethereum
        );
        setCoinList(filteredItems);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = async (id: string) => {
    try {
      setLoading(true);
      const currentDate = moment(new Date()).format("DD-MM-YYYY");
      const oldDate = moment(new Date())
        .subtract(1, "days")
        .format("DD-MM-YYYY");

      await Promise.all([
        coinGecko.coinHistory(id, oldDate),
        coinGecko.coinHistory(id, currentDate),
      ]).then((result) => {
        const [oldInfo, newInfo] = result;
        setOldCoinInfo(oldInfo.data);
        setCurrentCoinInfo(newInfo.data);
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card style={{ width: "60%" }}>
      <div>
        <SearchFilter onSearch={onSearch} coinList={coinList} />
        <Divider />
        {!_.isEmpty(currentCoinInfo) && !_.isEmpty(oldCoinInfo) ? (
          <DisplayCurrency
            data-testid="display-box"
            currentInfo={currentCoinInfo}
            oldInfo={oldCoinInfo}
            isLoading={loading}
          ></DisplayCurrency>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        <p>
          Data provided by <a href="https://www.coingecko.com/en">CoinGecko</a>
        </p>
      </div>
    </Card>
  );
}

export default MainCard;
