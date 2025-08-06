
export type RootStackParamList = {
    Login: undefined;
    Main: undefined;
    MovieDetails: { movie: any };
};

export type TabParamList = {
    Home: undefined;
    Favorites: undefined;
};

// Extend the navigation types to include our custom param lists
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
