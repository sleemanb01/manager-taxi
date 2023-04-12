import React, { ReactNode } from "react";
import { FlatList, View } from "react-native";
import { List, Avatar, Divider } from "react-native-paper";

type Props<ItemT> = {
  data?: ItemT[];
  onPressListItem: (item: ItemT) => void;
  keyExtractor: (item: ItemT) => string;
  RenderItem: ({
    item,
    pressHandler,
    secondaryText,
  }: {
    item: ItemT;
    pressHandler?: (item: ItemT) => void;
    secondaryText?: string;
  }) => JSX.Element;
  children?: {
    getElement: (item: ItemT) => JSX.Element;
    isExpand: (item: ItemT) => boolean;
  };
  secondaryText?: (item: ItemT) => string;
  // headerTitle: (item: ItemT) => string;
};
export default function GenericList<ItemT>({
  data,
  onPressListItem,
  keyExtractor,
  RenderItem,
  children,
  secondaryText,
}: // children,
// secondaryText,
// headerTitle,
Props<ItemT>) {
  const renderItem = ({ item }: { item: ItemT }) => (
    // <View>
    // <List.Item
    //   onPress={() => onPressListItem(item)}
    //   title={headerTitle(item)}
    //   description={secondaryText(item)}
    //   left={() => <Avatar.Icon size={50} icon="folder" />}
    // />
    // {children?.isExpand(item) && (
    //   <View style={{ marginStart: 30 }}>{children.getElement(item)}</View>
    // )}
    // </View>
    <View>
      <RenderItem
        item={item}
        pressHandler={onPressListItem}
        secondaryText={secondaryText ? secondaryText(item) : undefined}
      />
      {children?.isExpand(item) && (
        <View style={{ marginStart: 10 }}>{children.getElement(item)}</View>
      )}
    </View>
  );

  if (data?.length === 0) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <FlatList
      style={{ marginVertical: 10 }}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Divider />}
    />
  );
}
