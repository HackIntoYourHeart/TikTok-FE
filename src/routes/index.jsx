import { HeaderOnly } from '~/components/Layout';
import Following from '~/pages/Following';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import SignUp from '~/pages/SignUp';
import Login from '~/pages/Login';
import YourAccount from '~/pages/YourAccount';
import Page404 from '~/pages/404';
import RankingPage from '~/pages/RankingPage';
import Explore from '~/pages/Explore';
import Live from '~/pages/Live';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/explore', component: Explore },
    { path: '/live', component: Live },
    { path: '/profile/:userId', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null },
    { path: '/sign-up', component: SignUp, layout: HeaderOnly },
    { path: '/login', component: Login, layout: HeaderOnly },
    { path: '/ranking', component: RankingPage, layout: HeaderOnly },
    { path: '/your-profile', component: YourAccount },
    { path: '/404-page', component: Page404 },
];

const privateRoutes = [{ path: '/id', component: YourAccount }];

export { privateRoutes, publicRoutes };
