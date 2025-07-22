// This file contains translations. What I have done here is as follows...
// 1. Created TRANSLATIONS object that holds the en dna fr strings of text from the app as a constant
// 2. Created a type TranslationKey that is a key of the TRANSLATIONS object
// 3. Created a function t that takes a TranslationKey and returns the correct text based on the language
// 4. the getLanguage function is used to get the language of the user
// NOTE: We can do this in another way where we save getter functions in POMs. The decision to use POM or functional helper may determine what kind of translation solution we want to implement. 
// NOTE2: We can also name the keys in the TRANSLATION object similar to the elements in the POM. The decision depends on how comfortable the team is. Looking at text in the UI vs depending on element functions in POM

import { LanguageHelper } from '../helpers/language-helper';

export const TRANSLATIONS = {
  required: {
    en: 'Required', 
    fr: 'Requis'
  },
  yourPasswordIsTooWeak: {
    en: 'Your password is too weak',
    fr: 'Veuillez choisir un mot de passe plus sûr.',
  },
  yourPasswordsDoNotMatch: {
    en: 'Your passwords do not match',
    fr: 'Vos mots de passe ne correspondent pas.',
  },
  invalidEmail: {
    en: 'Invalid email address',
    fr: 'Courriel invalide',
  },
  invalidPhoneNumber: { // Assumption: The phone number is invalid if it is less than 10 digits
    en: 'Invalid phone number',
    fr: 'Numéro de téléphone invalide',
  },
  accountAlreadyExists: {
    en: 'Account already exists', 
    fr: 'Le compte existe déjà'
  },
  thisAccountAlreadyExistsPleaseLogIn: {
    en: 'this account already exists. please log in.',
    fr: 'ce compte existe déjà. veuillez vous connecter.',
  },

  // Get a quote Page
  howCanWeHelpYouWithYourMortgage: {
    en: 'How can we help you with your mortgage?',
    fr: 'Comment peut-on vous aider avec votre hypothèque?',
  },
  newMortgage: {
    en: 'New mortgage', 
    fr: 'Nouvelle hypothèque'
  },
  iNeedAPreQualification: {
    en: 'I need a pre-qualification, proof of financing for my offer or a new mortgage for the property I am buying.',
    fr: 'J\'ai besoin d\'une pré-qualification hypothécaire, preuve de financement pour mon offre ou une nouvelle hypothèque pour la propriété que j\'achète.',
  },
  refinanceMyMortgage: {
    en: 'Refinance my mortgage', 
    fr: 'Refinancement hypothécaire'
  },
  iWantToRefinance: {
    en: 'I want to refinance to lower my mortgage payments and increase cash flow, consolidate my debts, access my equity to fund an investment or major expense.',
    fr: 'Je veux refinancer pour réduire mes payements hypothécaires et augmenter ma liquidité, consolider mes dettes, accéder à mes capitaux dans ma propriété pour financer un investissement ou une dépense majeure.',
  },
  mortgageRenewal: {
    en: 'Mortgage Renewal', 
    fr: 'Renouvellement hypothécaire'
  },
  iWantToRenewMyMortgage: {
    en: 'I want to renew my mortgage or compare my current lender’s offer with nesto\'s offer because my mortgage renewal date is coming up.',
    fr: 'Je veux renouveler mon hypothèque ou comparer l\'offre de mon prêteur actuel à celle de nesto, car la date de mon renouvellement arrive bientôt.',
  },
  // Province names
  Alberta: {
    en: 'Alberta', 
    fr: 'Alberta' 
  },
  'British Columbia': {
    en: 'British Columbia', 
    fr: 'Colombie-Britannique'
  },
  Manitoba: {
    en: 'Manitoba', 
    fr: 'Manitoba' 
  },
  'New Brunswick': { 
    en: 'New Brunswick', 
    fr: 'Nouveau-Brunswick' 
  },
  'Newfoundland and Labrador': { 
    en: 'Newfoundland and Labrador', 
    fr: 'Terre-Neuve-et-Labrador' 
  },
  'Nova Scotia': { 
    en: 'Nova Scotia', 
    fr: 'Nouvelle-Écosse' 
  },
  Ontario: { 
    en: 'Ontario', 
    fr: 'Ontario' 
  },
  'Prince Edward Island': { 
    en: 'Prince Edward Island', 
    fr: 'Île-du-Prince-Édouard' 
  },
  Quebec: { 
    en: 'Quebec', 
    fr: 'Québec' 
  },
  Saskatchewan: { 
    en: 'Saskatchewan', 
    fr: 'Saskatchewan' 
  },
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS;

export function t(key: TranslationKey): string {
    const lang = LanguageHelper.getLanguage();
    return TRANSLATIONS[key]?.[lang] ?? TRANSLATIONS[key]?.en ?? key;
  }