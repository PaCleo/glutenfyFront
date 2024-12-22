import { apiClient } from '../apiClient';

export default function Logout(navigate: (url: string) => void) {        
    apiClient.post('/auth/logout').then(() => {
        navigate('/login');
    }).catch(error => {
        console.error('Erro ao fazer logout:', error);
    });
}