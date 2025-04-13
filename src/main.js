import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import App from './App.vue';
import router from './router';
import 'primevue/resources/themes/aura-light-green/theme.css'


import Button from "primevue/button"
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
import Checkbox from 'primevue/checkbox';
import PrimePreloader from '@/components/Preloader/PrimePreloader.vue';
import ProgressSpinner from 'primevue/progressspinner';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import Toast from 'primevue/toast';
import PanelMenu from 'primevue/panelmenu';
import Sidebar from 'primevue/sidebar';
import ConfirmPopup from 'primevue/confirmpopup';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(router);  // подключаем маршрутизатор
app.use(PrimeVue);
app.mount('#app');
app.component('AppButton', Button);
// eslint-disable-next-line vue/multi-word-component-names
app.component('Checkbox', Checkbox);
app.component('AppSidebar', Sidebar);
app.component('AppDialog', Dialog);
app.component('AppCalendar', Calendar);
app.component('DataTable', DataTable);
app.component('PanelMenu', PanelMenu);
app.component('AppToast', Toast);
app.component('AppColumn', Column);
// eslint-disable-next-line vue/multi-word-component-names
app.component('Toolbar', Toolbar);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('InputText', InputText);
app.component('ColumnGroup', ColumnGroup);
app.component('AppRow', Row);
app.component('ConfirmPopup', ConfirmPopup);
app.component('PrimePreloader', PrimePreloader)
app.component('ProgressSpinner', ProgressSpinner)
import './assets/tailwind.css'
import Toolbar from "primevue/toolbar";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
