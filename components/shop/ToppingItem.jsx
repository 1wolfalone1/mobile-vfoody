import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Checkbox, RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Images } from '../../constant';
import colors from '../../constant/colors';
import shopDetailsSlice, { dataShopDetailsSelector } from '../../redux/slice/shopDetailsSlice';
import { formatNumberVND } from '../../utils/MyUtils';
const ToppingItem = ({ topping }) => {
  return topping == null ? (
    <SkeletonItem />
  ) : (
    <View>
      {topping.questionType == 1 ? (
        <ToppingRadio topping={topping} />
      ) : (
        <ToppingCheckBox topping={topping} />
      )}
    </View>
  );
};

export default ToppingItem;

const SkeletonItem = ({}) => {
  return (
    <View>
      <Text>SkeletonItem</Text>
    </View>
  );
};

const ToppingRadio = ({ topping }) => {
  const dispatch = useDispatch();
  const { product } = useSelector(dataShopDetailsSelector);
  const [value, setValue] = useState(null);
  console.log(product.toppingSelected.radio.get(topping.id), ' proudct ne ');
  const handleSetValue = (v) => {
    if (v === value) {
      setValue(null);
    } else {
      setValue(v);
    }
  };

  useEffect(() => {
    dispatch(
      shopDetailsSlice.actions.addToppingRadio({
        toppingId: topping.id,
        optionId: value,
      }),
    );
  }, [value]);
  return (
    <RadioButton.Group onValueChange={(value) => handleSetValue(value)} value={value}>
      <Text className="text-lg font-bold">Topping nhân</Text>
      <View className="gap-4 mt-0 mb-4">
        {topping.options.map((item, index) => (
          <View className="flex flex-row justify-between items-center" key={item.id}>
            <View className="flex flex-row items-center">
              <Image
                source={item.imageUrl ? { uri: item.imageUrl } : Images.ToppingDefault}
                className="w-8 h-8 rounded-lg"
              />
              <Text className="ml-2">{item.description}</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-primary">{formatNumberVND(item.price)}</Text>
              <RadioButton.Android
                value={item.id}
                // status={toppingChecked === item.name ? 'checked' : 'unchecked'}
                color={colors.primaryBackgroundColor}
              />
            </View>
          </View>
        ))}
      </View>
    </RadioButton.Group>
  );
};

const ToppingCheckBox = ({ topping }) => {
  const dispatch = useDispatch();
  const { product } = useSelector(dataShopDetailsSelector);
  const [checks, setChecked] = useState([]);
  const getStatus = (id) => {
    return checks.includes(id);
  };
  console.log(product);
  console.log(product.toppingSelected.checkbox.get(topping.id), ': asdfasfd', topping.id);
  const setStatus = (id) => {
    if (checks.includes(id)) {
      setChecked(checks.filter((item) => item !== id));
    } else {
      setChecked([...checks, id]);
    }
  };
  useEffect(() => {
    dispatch(
      shopDetailsSlice.actions.addToppingCheckbox({
        toppingId: topping.id,
        checks: checks,
      }),
    );
  }, [checks]);
  return (
    <View>
      <Text className="text-lg font-bold">{topping.description}</Text>
      <View className="gap-4 mt-0 mb-4">
        {topping.options.map((item, index) => (
          <View className="flex flex-row justify-between items-center" key={item.id}>
            <View className="flex flex-row items-center">
              <Image
                source={item.imageUrl ? { uri: item.imageUrl } : Images.ToppingDefault}
                className="w-8 h-8 rounded-lg mr-2"
              />
              <Text className="ml-2 font-hnow64regular">{item.description}</Text>
            </View>
            <View className="flex-row items-center">
              <Text className="text-primary">{formatNumberVND(item.price)}</Text>
              <Checkbox.Android
                value={item.id}
                status={getStatus(item.id) ? 'checked' : 'unchecked'}
                color={colors.primaryBackgroundColor}
                onPress={(e) => setStatus(item.id)}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
