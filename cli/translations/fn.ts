/**
 * Helper functions for reading translations
 */

import { ObjectFileName, objectFiles, TranslationCultureKey, translations, translationsBasePath } from '../configuration';
import { promises as fs } from 'fs';
import { AllTranslationsDict } from './types';
import { MultiLanguageText } from '../../abstractions/dist';

/** Read translations from json as dict key: transated */
export async function readTranslationsFile(objType: ObjectFileName, culture: TranslationCultureKey): Promise<Record<string, string>> {
    const json = await fs.readFile(`${translationsBasePath}/${culture}/${objType}.json`, 'utf-8');
    return JSON.parse(json);
}

/** Read and return all translations culture: objectType: key: translation */
export async function readAllTranslations(): Promise<AllTranslationsDict> {
    const readCulture = (c: TranslationCultureKey) => Promise.all(objectFiles.map(async f => <const>[f, await readTranslationsFile(f, c)]))
        .then(kv => kv.reduce((prev, cur) => (prev[cur[0]] = cur[1], prev), <Record<string, Record<string, string>>>{}));

    return await Promise.all(translations.map(async c => <const>[c, await readCulture(c)]))
        .then(kv => kv.reduce((prev, cur) => (prev[cur[0]] = cur[1], prev), <AllTranslationsDict>{}));
}

/** Extract translation from nested "all translations" dict */
export function getTranslation(allTranslations: AllTranslationsDict, objType: ObjectFileName, culture: TranslationCultureKey, key: string): string {
    return allTranslations[culture][objType]?.[key];
}

/** Get dict with all languages {culture: translation} */
export function multiLang(allTranslations: AllTranslationsDict, en: string | undefined, objType: ObjectFileName, key: string): MultiLanguageText | undefined {
    if (en === undefined) return undefined;
    return <MultiLanguageText>translations.reduce((prev, cur) => (prev[cur] = getTranslation(allTranslations, objType, cur, key), prev), <Partial<MultiLanguageText>>{ 'en-US': en });
}

/** Write object translations */
export async function writeTranslatsion(objType: ObjectFileName, culture: TranslationCultureKey, dict: Record<string, string>): Promise<void> {
    await fs.mkdir(`${translationsBasePath}/${culture}`, { recursive: true });

    const json = JSON.stringify(dict, null, 4);
    await fs.writeFile(`${translationsBasePath}/${culture}/${objType}.json`, json);
}
