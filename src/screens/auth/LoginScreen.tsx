import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Google from 'expo-auth-session/providers/google';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { RootStackParamList } from '../../navigation/types';
import { redirectUri } from '../../utils/config';
import { Env } from '../../utils/env';

const LoginScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: Env.GOOGLE_CLIENT_ID,
        redirectUri

    });

    useEffect(() => {
        if (response?.type === 'success') {
            const token = response.authentication?.accessToken;
            console.log('✅ Google Access Token:', token);
            // TODO: Save token, redirect to Home
        }
    }, [response]);

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            // Store token here
            navigation.reset({
                index: 0,
                routes: [{ name: 'Main' }],
            });
        }
    }, [response]);

    return (
        <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.content}>
                <Image
                    source={require('/Users/culture007/code/mobile/react-native/movie-list/assets/logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>MovieList</Text>
                <TouchableOpacity
                    style={styles.googleButton}
                    // onPress={() => promptAsync()} //Todo: implement Google Login
                    onPress={() => {
                        navigation.navigate('Main');
                    }}
                    disabled={!request}
                >
                    <AntDesign name="google" size={24} color="white" style={styles.googleIcon} />
                    <Text style={styles.googleText}>Continue with Google</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 24,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 40,
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#DB4437',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
    },
    googleIcon: {
        marginRight: 12,
    },
    googleText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
