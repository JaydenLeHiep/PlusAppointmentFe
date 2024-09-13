import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import appointmentDetailsViewEn from '../locales/en/appointment/appointmentInfoModal/appointmentDetailsViewEn.json';
import appointmentDetailsViewVi from '../locales/vi/appointment/appointmentInfoModal/appointmentDetailsViewVi.json';
import appointmentInfoModalEn from '../locales/en/appointment/appointmentInfoModal/appointmentInfoModalEn.json';
import appointmentInfoModalVi from '../locales/vi/appointment/appointmentInfoModal/appointmentInfoModalVi.json';
import confirmationDialogEn from '../locales/en/components/confirmationDialogEn.json'
import confirmationDialogVi from '../locales/vi/components/confirmationDialogVi.json'
import navbarEn from '../locales/en/components/navbarEn.json'
import navbarVi from '../locales/vi/components/navbarVi.json'
import serviceFormEn from '../locales/en/appointment/appointmentInfoModal/serviceFormEn.json'
import serviceFormVi from '../locales/vi/appointment/appointmentInfoModal/serviceFormVi.json'
import appointmentEditViewEn from '../locales/en/appointment/appointmentInfoModal/appointmentEditViewEn.json';
import appointmentEditViewVi from '../locales/vi/appointment/appointmentInfoModal/appointmentEditViewVi.json';
import appointmentListEn from '../locales/en/appointment/appointmentListEn.json';
import appointmentListVi from '../locales/vi/appointment/appointmentListVi.json';
import customerSearchEn from '../locales/en/appointment/addAppointment/customerSearchEn.json';
import customerSearchVi from '../locales/vi/appointment/addAppointment/customerSearchVi.json';
import serviceFormAddAppointmentEn from '../locales/en/appointment/addAppointment/serviceFormAddAppointmentEn.json';
import serviceFormAddAppointmentVi from '../locales/vi/appointment/addAppointment/serviceFormAddAppointmentVi.json';
import appointmentFormEn from '../locales/en/appointment/addAppointment/appointmentFormEn.json';
import appointmentFormVi from '../locales/vi/appointment/addAppointment/appointmentFormVi.json';
import appointmentActionsEn from '../locales/en/appointment/addAppointment/appointmentActionEn.json';
import appointmentActionsVi from '../locales/vi/appointment/addAppointment/appointmentActionVi.json';
import addAppointmentDialogEn from '../locales/en/appointment/addAppointment/addAppointmentDialogEn.json';
import addAppointmentDialogVi from '../locales/vi/appointment/addAppointment/addAppointmentDialogVi.json';


import homePageEn from '../locales/en/home/homePageEn.json';
import homePageVi from '../locales/vi/home/homePageVi.json';


import businessListEn from '../locales/en/ownerDashboard/businessListEn.json';
import businessListVi from '../locales/vi/ownerDashboard/businessListVi.json';

import loginFormEn from '../locales/en/auth/login/loginFormEn.json';
import loginFormVi from '../locales/vi/auth/login/loginFormVi.json';


import loginHeroEn from '../locales/en/auth/login/loginHeroEn.json';
import loginHeroVi from '../locales/vi/auth/login/loginHeroVi.json';

import registerFormEn from '../locales/en/auth/register/registerFormEn.json';
import registerFormVi from '../locales/vi/auth/register/registerFormVi.json';

import registerPageEn from '../locales/en/auth/register/registerPageEn.json';
import registerPageVi from '../locales/vi/auth/register/registerPageVi.json';

import fullCalendarComponentEn from '../locales/en/calendar/fullCalendarComponentEn.json';  
import fullCalendarComponentVi from '../locales/vi/calendar/fullCalendarComponenetVi.json';

import showStaffDialogEn from '../locales/en/staff/showStaffDialogEn.json';
import showStaffDialogVi from '../locales/vi/staff/showStaffDialogVi.json';

import staffFormEn from '../locales/en/staff/staffFormEn.json';
import staffFormVi from '../locales/vi/staff/staffFormVi.json';

import serviceServiceFormEn from '../locales/en/service/serviceFormEn.json';
import serviceServiceFormVi from '../locales/vi/service/serviceFormVi.json';


import serviceListEn from '../locales/en/service/serviceListEn.json';
import serviceListVi from '../locales/vi/service/serviceListVi.json';

import showServicesDialogEn from '../locales/en/service/showServiceDialogEn.json';
import showServicesDialogVi from '../locales/vi/service/showServiceDialogVi.json';

import customerFormEn from '../locales/en/customer/customerFormEn.json';
import customerFormVi from '../locales/vi/customer/customerFormVi.json';

import dialogCustomerActionsEn from '../locales/en/customer/dialogCustomerActionsEn.json';
import dialogCustomerActionsVi from '../locales/vi/customer/dialogCustomerActionsVi.json';

import showCustomerDialogEn from '../locales/en/customer/showCustomerDialogEn.json';
import showCustomerDialogVi from '../locales/vi/customer/showCustomerDialogVi.json';

import customerListEn from '../locales/en/customer/customerListEn.json';
import customerListVi from '../locales/vi/customer/customerListVi.json';

import footerEn from "../locales/en/components/footerEn.json"
import footerVi from "../locales/vi/components/footerVi.json"

import staffListEn from "../locales/en/staff/staffListEn.json"
import staffListVi from "../locales/vi/staff/staffListVi.json"

// customer
import backNextButtonEn from '../locales/en/customerDashboard/backNextButtonEn.json';
import backNextButtonGe from '../locales/ge/customerDashboard/backNextButtonGe.json';

import oldCustomerFormEn from '../locales/en/customerDashboard/oldCustomerFormEn.json';
import oldCustomerFormDe from '../locales/ge/customerDashboard/oldCustomerFormGe.json';

import newCustomerFormEn from '../locales/en/customerDashboard/newCustomerFormEn.json';
import newCustomerFormGe from '../locales/ge/customerDashboard/newCustomerFormGe.json';

import appointmentOverviewPageEn from '../locales/en/customerDashboard/appointmentOverviewPageEn.json';
import appointmentOverviewPageGe from '../locales/ge/customerDashboard/appointmentOverviewPageGe.json';

import myDatePickerEn from '../locales/en/customerDashboard/myDatePickerEn.json';
import myDatePickerGe from '../locales/ge/customerDashboard/myDatePickerGe.json';

import thankYouPageEn from '../locales/en/customerDashboard/thankYouPageEn.json';
import thankYouPageGe from '../locales/ge/customerDashboard/thankYouPageGe.json';

import businessHomePageEn from '../locales/en/home/businessHomePageEn.json'
import businessHomePageVi from '../locales/vi/home/businessHomePageVi.json'

import calendarDialogEn from '../locales/en/staff/calendarDialogEn.json'
import calendarDialogVi from '../locales/vi/staff/calendarDialogVi.json'

import ownerDashboardEn from '../locales/en/ownerDashboard/ownerDashboardEn.json'
import ownerDashboardVi from '../locales/vi/ownerDashboard/ownerDashboardVi.json'

import notAvailableTimeEn from '../locales/en/staff/notAvailableTimeEn.json';
import notAvailableTimeVi from '../locales/vi/staff/notAvailableTimeVi.json';
// Import other translation files similarly

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        appointmentDetailsView: appointmentDetailsViewEn,
        appointmentInfoModal: appointmentInfoModalEn,
        confirmationDialog: confirmationDialogEn,
        navbar: navbarEn,
        serviceForm: serviceFormEn,
        appointmentEditView: appointmentEditViewEn,
        appointmentList: appointmentListEn,
        customerSearch: customerSearchEn,
        serviceFormAddAppointment: serviceFormAddAppointmentEn,
        appointmentForm: appointmentFormEn,
        appointmentActions: appointmentActionsEn,
        addAppointmentDialog: addAppointmentDialogEn,
        homePage: homePageEn,
        businessList: businessListEn,
        loginForm: loginFormEn,
        loginHero: loginHeroEn,
        registerForm: registerFormEn,
        registerPage: registerPageEn,
        fullCalendarComponent: fullCalendarComponentEn,
        showStaffDialog: showStaffDialogEn,
        staffForm: staffFormEn,
        serviceServiceForm: serviceServiceFormEn,
        serviceList: serviceListEn,
        showServicesDialog: showServicesDialogEn,
        customerForm: customerFormEn,
        dialogCustomerActions: dialogCustomerActionsEn,
        showCustomerDialog: showCustomerDialogEn,
        customerList: customerListEn,
        footer: footerEn,
        staffList: staffListEn,
        backNextButton: backNextButtonEn,
        oldCustomerForm: oldCustomerFormEn,
        newCustomerForm: newCustomerFormEn,
        appointmentOverviewPage: appointmentOverviewPageEn,
        myDatePicker: myDatePickerEn,
        thankYouPage: thankYouPageEn,
        businessHomePage: businessHomePageEn,
        calendarDialog: calendarDialogEn,
        ownerDashboard: ownerDashboardEn,
        notAvailableTime: notAvailableTimeEn
        // Add other namespaces for English
      },
      vi: {
        appointmentDetailsView: appointmentDetailsViewVi,
        appointmentInfoModal: appointmentInfoModalVi,
        confirmationDialog: confirmationDialogVi,
        navbar: navbarVi,
        serviceForm: serviceFormVi,
        appointmentEditView: appointmentEditViewVi,
        appointmentList: appointmentListVi,
        customerSearch: customerSearchVi,
        serviceFormAddAppointment: serviceFormAddAppointmentVi,
        appointmentForm: appointmentFormVi,
        appointmentActions: appointmentActionsVi,
        addAppointmentDialog: addAppointmentDialogVi,
        homePage: homePageVi,
        businessList: businessListVi,
        loginForm: loginFormVi,
        loginHero: loginHeroVi,
        registerForm: registerFormVi,
        registerPage: registerPageVi,
        fullCalendarComponent: fullCalendarComponentVi,
        showStaffDialog: showStaffDialogVi,
        staffForm: staffFormVi,
        serviceServiceForm: serviceServiceFormVi,
        serviceList: serviceListVi,
        showServicesDialog: showServicesDialogVi,
        customerForm: customerFormVi,
        dialogCustomerActions: dialogCustomerActionsVi,
        showCustomerDialog: showCustomerDialogVi,
        customerList: customerListVi,
        footer: footerVi,
        staffList: staffListVi,
        businessHomePage: businessHomePageVi,
        calendarDialog: calendarDialogVi,
        ownerDashboard: ownerDashboardVi,
        notAvailableTime: notAvailableTimeVi
        // Add other namespaces for Vietnamese
      },
      ge: {  // Add a new language key for German
        backNextButton: backNextButtonGe,
        oldCustomerForm: oldCustomerFormDe,
        newCustomerForm: newCustomerFormGe,
        appointmentOverviewPage: appointmentOverviewPageGe,
        myDatePicker: myDatePickerGe,
        thankYouPage: thankYouPageGe
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
