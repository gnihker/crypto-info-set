import { Select } from "antd";
import _ from "lodash";
import { CoinInfo } from "./Interface";

function SearchFilter({
  onSearch,
  coinList,
}: {
  onSearch: any;
  coinList: CoinInfo[];
}) {
  return (
    <Select
      data-testid="select-coin"
      showSearch
      placeholder="Select any coin"
      optionFilterProp="children"
      style={{ width: "100%", textAlign: "start" }}
      onSelect={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
        (option?.value ?? "").toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
        (option?.symbol ?? "").toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      options={
        !_.isEmpty(coinList)
          ? coinList.map((item) => ({
              value: item.id,
              label: item.name,
              symbol: item.symbol,
            }))
          : []
      }
    ></Select>
  );
}

export default SearchFilter;
