import AppHome from '../../views/Home';
import AppNewAccount from '../../views/New-Account';
import AppDisqualification from '../../views/Disqualification';
import AppError from '../../views/Error';

export const routes = [
    {
        path:"/",
        exact: true,
        component: AppHome,
    },
    {
        path:"/new_account",
        exact: true,
        component: AppNewAccount
    },
    {
        path:"/disqualification",
        exact: true,
        component: AppDisqualification
    },
    {
        path:"/error",
        exact: true,
        component: AppError
    }
];