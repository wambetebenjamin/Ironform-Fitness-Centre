declare module "vanilla-tilt" {
  export interface TiltOptions {
    max?: number;
    speed?: number;
    glare?: boolean;
    scale?: number;
  }
  const VanillaTilt: { init(elements: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, settings?: TiltOptions): void };
  export default VanillaTilt;
}

interface HTMLElement {
  vanillaTilt?: { destroy: () => void };
}
