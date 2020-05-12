declare module 'eres' {
  export default function eres<T>(
    promise: Promise<T>,
  ): Promise<[Error, T | undefined]>;
}
