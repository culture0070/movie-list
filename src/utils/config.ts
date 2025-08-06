import * as AuthSession from 'expo-auth-session';

export const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'movie-list',
    useProxy: true,
} as any);

