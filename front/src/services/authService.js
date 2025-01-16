const TOKEN_KEY = 'authToken';

export const authService = {
    // Stocker le token
    setToken: (token) => {
        localStorage.setItem(TOKEN_KEY, token);
    },

    // Récupérer le token
    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },

    // Supprimer le token
    removeToken: () => {
        localStorage.removeItem(TOKEN_KEY);
    },

    // Vérifier si l'utilisateur est connecté
    isAuthenticated: () => {
        return !!localStorage.getItem(TOKEN_KEY);
    }
}; 