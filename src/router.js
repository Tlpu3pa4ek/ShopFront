import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from "@/components/Client/Authorization/LoginPage.vue";
import RegisterPage from "@/components/Client/Authorization/RegisterPage.vue";
// import ServicesPage from "@/components/Client/Services/ServicesPage.vue";
import AboutUs from "@/components/Navigation/AboutUs.vue";
import ContactsPage from "@/components/Navigation/ContactsPage.vue";
import CartServices from "@/components/Client/Cart/CartServices.vue";
// import CategoryIndex from "@/components/Client/Category/CategoryIndex.vue";
import editCategories from "@/components/Admin/EditCategories.vue";
import ShowService from "@/components/Admin/ShowService.vue";
import CategoryShow from "@/components/Client/Category/CategoryShow.vue";
import ProfilePage from "@/components/Client/Profile/ProfilePage.vue";
import AdminPage from "@/components/Admin/AdminPage.vue";
import EmployeesPage from "@/components/Admin/Employees/EmployeesPage.vue";
import LandingPage from "@/components/Client/Lending/LandingPage.vue";
import UserProfile from "@/components/Client/Profile/UserProfile.vue";


const routes = [
    {
        path: '/admin',
        component: () => import('@/components/DefaultLayout/DefaultLayout.vue'),
        children: [
            // {path: '/home', component: ServicesPage},
            {path: '/dashboard', component: AdminPage},
            {path: '/employees', component: EmployeesPage},
            {path: '/about', component: AboutUs},
            {path: '/contacts', component: ContactsPage},
            {path: '/service/:id', component: ShowService, props: true},
            {path: '/cart', component: CartServices},
            // {path: '/categories', component: CategoryIndex},
            {path: '/edit/categories', component: editCategories},
            {path: '/category/:id', component: CategoryShow, props: true},
            {path: '/edit/services/:id', component: ShowService, props: route => ({id: route.params.id})},
            {path: '/profile/:id', component: ProfilePage, props: true},
        ],
    },

    {path: '/', component: LandingPage},
    {path: '/login', component: LoginPage},
    {path: '/register', component: RegisterPage},
    {path: '/user/profile/:id', component: UserProfile, props: true},


];


const router = createRouter({
    history: createWebHistory(),
    routes,
});




export default router;
