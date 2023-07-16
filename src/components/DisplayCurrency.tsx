import { Descriptions, Spin } from "antd";
import { CoinHistoricalInfo } from "./Interface";

function DisplayCurrency({
  currentInfo,
  oldInfo,
  isLoading,
}: {
  currentInfo?: CoinHistoricalInfo;
  oldInfo?: CoinHistoricalInfo;
  isLoading?: boolean;
}) {
  const percentChangeCalculate = (old: number, current: number) => {
    let result: number;
    if (old === 0) return "N/A";
    else {
      result = ((current - old) / old) * 100;
      if (result >= 0)
        return <p className="percentPos">+{result.toFixed(2)}%</p>;
      else return <p className="percentNeg">{result.toFixed(2)}%</p>;
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spin></Spin>
      ) : (
        <Descriptions
          title={currentInfo?.name + ` (${currentInfo?.symbol})`}
          layout="vertical"
          bordered
          size={"middle"}
          style={{ textAlign: "start" }}
        >
          <Descriptions.Item label="Prev. Price">
            {oldInfo?.market_data?.current_price?.usd.toFixed(2) ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            {currentInfo?.market_data?.current_price?.usd.toFixed(2) ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="% Change">
            {percentChangeCalculate(
              oldInfo?.market_data?.current_price?.usd,
              currentInfo?.market_data?.current_price?.usd
            ) ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Prev. Market Cap">
            {oldInfo?.market_data?.market_cap?.usd.toFixed(2) ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Market Cap">
            {currentInfo?.market_data?.market_cap?.usd.toFixed(2) ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="% Change">
            {percentChangeCalculate(
              oldInfo?.market_data?.market_cap?.usd,
              currentInfo?.market_data?.market_cap?.usd
            ) ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Prev. Volume">
            {oldInfo?.market_data?.total_volume?.usd.toFixed(2) ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="Volume">
            {currentInfo?.market_data?.total_volume?.usd.toFixed(2) ?? "N/A"}
          </Descriptions.Item>
          <Descriptions.Item label="% Change">
            {percentChangeCalculate(
              oldInfo?.market_data?.total_volume?.usd,
              currentInfo?.market_data?.total_volume?.usd
            ) ?? "N/A"}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
}

export default DisplayCurrency;
