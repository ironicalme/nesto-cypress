import { faker } from '@faker-js/faker';
import { LanguageHelper } from '../helpers/language-helper';
import { t } from '../support/translations';

// Borrower interface
export interface Borrower {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  province: string;
  agreeToTerms: boolean;
}

const CANADIAN_PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
];

function getRandomProvince() {
  return CANADIAN_PROVINCES[Math.floor(Math.random() * CANADIAN_PROVINCES.length)];
}

// Helper function to get province name in current language
export function getProvinceInCurrentLanguage(province: string): string {
  return t(province as any);
}

function getSimplePhoneNumber() {
  // Always generate a 10-digit number as a string
  let num = '';
  for (let i = 0; i < 10; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
}

function getCustomEmail(firstName: string, lastName: string) {
  const clean = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const rand = faker.string.alphanumeric(6).toLowerCase();
  return `${clean(firstName)}.${clean(lastName)}.${rand}@domain.com`;
}

export function generateBorrower(overrides: Partial<Borrower> = {}): Borrower {
  const firstName = overrides.firstName ?? faker.person.firstName();
  const lastName = overrides.lastName ?? faker.person.lastName();
  const baseProvince = overrides.province ?? getRandomProvince();

  return {
    firstName,
    lastName,
    phoneNumber: overrides.phoneNumber ?? getSimplePhoneNumber(),
    email: overrides.email ?? getCustomEmail(firstName, lastName),
    password: overrides.password ?? Cypress.env('password'),
    province: getProvinceInCurrentLanguage(baseProvince),
    agreeToTerms: overrides.agreeToTerms ?? true,
  };
}

export function getPhoneNumberWithDashes(phoneNumber: string) {
  return `${phoneNumber.substring(0,3)}-${phoneNumber.substring(3,6)}-${phoneNumber.substring(6,10)}`;
}

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getRegionFromProvince(province: string) {
  const provinceMap = {
    'Alberta': 'AB',
    'British Columbia': 'BC',
    'Manitoba': 'MB',
    'New Brunswick': 'NB',
    'Newfoundland and Labrador': 'NL',
    'Nova Scotia': 'NS',
    'Ontario': 'ON',
    'Prince Edward Island': 'PE',
    'Quebec': 'QC',
    'Saskatchewan': 'SK',
  }
  return provinceMap[province as keyof typeof provinceMap];
}