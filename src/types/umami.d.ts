export {}

type UmamiEventData = Record<string, string | number>

interface UmamiTracker {
  track(): Promise<void>
  track(eventName: string): Promise<void>
  track(eventName: string, data: UmamiEventData): Promise<void>
  track(payload: Record<string, unknown>): Promise<void>
  track(
    fn: (props: Record<string, unknown>) => Record<string, unknown>,
  ): Promise<void>
  identify(uniqueId: string): Promise<void>
  identify(uniqueId: string, data: UmamiEventData): Promise<void>
  identify(data: UmamiEventData): Promise<void>
}

declare global {
  interface Window {
    umami?: UmamiTracker
  }
}
