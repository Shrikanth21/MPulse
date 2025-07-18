const CHAR_FOR_RANDOM_STRING: any = {
    digits: '0123456789',
    'non-digits': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()',
    letters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    'letters-lowercase': 'abcdefghijklmnopqrstuvwxyz',
    alphanumeric: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
};

export function getRandomString(
    charsType: 'digits' | 'non-digits' | 'alphanumeric' | 'letters' | 'letters-lowercase',
    length: number,
): string {
    let result = '';
    let characters: string;

    switch (charsType) {
        case 'digits':
            characters = CHAR_FOR_RANDOM_STRING['digits'];
            break;
        case 'non-digits':
            characters = CHAR_FOR_RANDOM_STRING['non-digits'];
            break;
        case 'letters':
            characters = CHAR_FOR_RANDOM_STRING['letters'];
            break;
        case 'letters-lowercase':
            characters = CHAR_FOR_RANDOM_STRING['letters-lowercase'];
            break;
        case 'alphanumeric':
            characters = CHAR_FOR_RANDOM_STRING['alphanumeric'];
            break;
    }

    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
