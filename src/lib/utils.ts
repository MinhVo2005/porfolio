export const parseText = (text: string) => {
    return text.split(/(?<=[.!?]) \s*/);
}