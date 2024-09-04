import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import PropTypes from "prop-types";
import { LineChart } from "react-native-chart-kit";

const MetricCard = ({ title, value, icon, data }) => (
  <View className="bg-white rounded-lg p-4 mb-4 shadow">
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex-row items-center">
        {icon}
        <Text className="font-semibold ml-2">{title}</Text>
      </View>
      <Text className="text-2xl font-bold">{value}</Text>
    </View>
    <LineChart
      data={{
        labels: data.map((item) => item.name),
        datasets: [
          {
            data: data.map((item) => item.value),
          },
        ],
      }}
      width={Dimensions.get("window").width - 50} // from react-native
      height={220}
      yAxisLabel=""
      yAxisSuffix=""
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726",
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
    {/* <TouchableOpacity className="mt-4">
      <Text className="text-blue-500 font-semibold">View Details</Text>
    </TouchableOpacity> */}
  </View>
);

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default MetricCard;
