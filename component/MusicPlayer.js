import React, {useEffect, useRef, useState} from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView, 
    Dimensions, 
    TouchableOpacity, 
    Image,
    Animated,
    DatePickerAndroid
} from 'react-native';

import Slider from '@react-native-community/slider'
import Ionicons from 'react-native-vector-icons/Ionicons';

import songs from '../model/data';

const { width, height} = Dimensions.get('window');

const MusicPlayer = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [songIndex, setSongIndex] = useState(0);

    const songSlider = useRef(null);
    useEffect(() => {
        scrollX.addListener(({ value }) => {
            //console.log('Scroll X', scrollX);
            //console.log('Device Width' , width);

            const index = Math.round( value / width );
            setSongIndex(index);

            //console.log('Indx: ', index);
        });

        return() => {
            scrollX.removeAllListeners();
        }
    }, []);

    const skipToNext = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1) * width,
        });
    }

    const skipToPrevious = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        });
    }

    const renderSongs = ({index, item}) => {
        return (
            <Animated.View style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View style={styles.artworkWrapper}>
                    <Image 
                        source={item.image} 
                        style={styles.artworkImg} 
                    />
                </View>
            </Animated.View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
            <View style={{width: width}}>
            <Animated.FlatList
            ref={songSlider}
                data={songs}
                renderItem={renderSongs}
                keyExtractor= {(item) => item.id}
                horizontal //it will scroll horizontally
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll= {Animated.event(
                    [{nativeEvent: {
                        contentOffset: {x: scrollX}
                    }}],
                    {useNativeDriver: true}
                )}
            />
            </View>
            <View>
                <Text style={styles.title}>{songs[songIndex].tittle}</Text>
                <Text style={styles.artist}>{songs[songIndex].artist}</Text>
            </View>

            <View>
                <Slider
                    style={styles.progressContainer}
                    value={10}
                    minimumValue={0}
                    maximumValue={100}
                    thumbTintColor="#FFD369"
                    minimumTrackTintColor="#FFD369"
                    maximumTrackValue = "#FFF"
                    onSlidingComplete={()=>{}}
                />
                <View style={styles.progressLabelContainer}>
                    <Text style={styles.progressLabelTxt}>0:00</Text>
                    <Text style={styles.progressLabelTxt}>3.55</Text>
                </View>
            </View>

            <View style = {styles.musicControlls}>
                <TouchableOpacity onPress={skipToPrevious}>
                    <Ionicons name="play-skip-back-outline" size={35} color="#FFD369" style={{marginTop:25}}  />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                    <Ionicons name="ios-pause-circle" size={75} color="#FFD369" />
                </TouchableOpacity>
                <TouchableOpacity onPress={skipToNext}>
                    <Ionicons name="play-skip-forward-outline" size={35} color="#FFD369" style={{marginTop:25}}/>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.bottomContainer}>
            <View style={styles.bottomControls}>
                <TouchableOpacity onPress={()=>{}}>
                    <Ionicons name="heart-outline" size={30} color="#777777" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                    <Ionicons name="repeat" size={30} color="#777777" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                    <Ionicons name="share-outline" size={30} color="#777777" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                    <Ionicons name="ellipsis-horizontal" size={30} color="#777777" />
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    );
};

export default MusicPlayer;

const styles = StyleSheet.create ({
    container: {
        flex: 0,
        padding: '30%',
        backgroundColor: '#222831',
        alignItems: 'center',
    },
    mainContainer: {
        flex: 0,
        padding: '10%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    artworkWrapper: { //artworkWrapper shadow effect just work for ios
        width: 300,
        height: 340,
        marginBottom: 25,

        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,

        elevation: 5
    },
    artworkImg: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    title: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        color: '#EEEEEE',
    },
    artist: {
        fontSize: 16,
        textAlign: 'center',
        color: '#EEEEEE',
        fontWeight:'200',
    },
    progressContainer: {
        width: 350,
        height: 40,
        marginTop: 25,
        flexDirection: 'row'
    },
    progressLabelContainer: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progressLabelTxt: {
        color: '#fff',
    },
    musicControlls: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    bottomContainer: {
        borderTopColor: '#393E46',
        borderTopWidth: 1,
        width: width,
        alignItems: 'center',
    },
    bottomControls: {
        borderTopColor:'#222831',
        borderTopWidth: 7,
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width:'80%',
    }
});