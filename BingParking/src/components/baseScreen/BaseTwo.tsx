import { Button, FlatList, Image, Text, TouchableOpacity, View, } from "react-native"
import { styles, t } from "../../utils/style"
import { useState, useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'

const BaseTwo = ({ navigation, route }: any) => {
    const isFocused = useIsFocused();
    const width = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: width.value,
        }
    });

    useEffect(() => {
        width.value = 1,
            (width.value = withSpring(18, {
                damping: 20,
                stiffness: 90,
                mass: 5
            }))
    }, [isFocused]);

    return (
        <View style={t`flex flex-col w-full justify-center items-center mt-auto mb-[51px]`}>
            <Image source={require("../../assets/Parking-bro.png")} />
            <Text style={t`flex text-[32px] w-full text-center ml-[24px] mt-[10px] mb-[10px] font-bold`}>Find Parking
                <Text style={t`text-${styles.colors.main}`}> Places </Text>
                Around You Easily</Text>
            <Text style={t`flex text-[18px] w-full text-center ml-[24px] text-[#616161] `}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            <View style={t`flex flex-row w-[50px] my-[20px] justify-center `}>
                <Animated.View style={[t`flex border-2 mr-5px rounded-full border-[#616161] w-1 border-${styles.colors.main}`, animatedStyles]}></Animated.View >
                <Animated.View style={[t`flex border-2 mr-5px rounded-full border-[#616161] w-1`,]}></Animated.View >
                <Animated.View style={[t`flex border-2 mr-5px rounded-full border-[#616161] w-1`,]}></Animated.View >
            </View>
            <TouchableOpacity
                onPress={() => {
                    (width.value = withSpring(0))
                    navigation.navigate('TutorialThree')
                }
                }>
                <LinearGradient
                    colors={['#CEC9F2', '#9C9FF0']}
                    style={[t`flex w-full  p-2 w-[368px] h-[58px] gap-[10px] rounded-lg mb-[12px] `, { alignItems: 'center', justifyContent: 'center', }]}
                ><Text style={[t`text-white text-[18px]`]}>Next</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    (width.value = withSpring(0))
                    navigation.navigate('TutorialOne')
                }
                }>
                <LinearGradient
                    colors={['#CEC9F2', '#9C9FF0']}
                    style={[t`flex w-full  p-2 w-[368px] h-[58px] gap-[10px] rounded-lg `, { alignItems: 'center', justifyContent: 'center', }]}
                ><Text style={[t`text-white text-[18px]`]}>Back</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View >
    )
};

export default BaseTwo;