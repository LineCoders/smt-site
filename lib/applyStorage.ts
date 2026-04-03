export type ApplicationStatus = 'pending' | 'approved' | 'rejected'

export type ApplicationData = {
  id: string
  name: string
  age: string
  contact: string
  experience: string
  gameTime: string
  contentCreator: string
  onlineTime: string
  plans: string
  source: string
  agreeRules: boolean
  status: ApplicationStatus
  reason?: string
  submittedAt: string
}

type DataStore = {
  byContact: Map<string, ApplicationData>
  byId: Map<string, ApplicationData>
}

declare global {
  var SMT_APP_STORE: DataStore | undefined
}

const store: DataStore = global.SMT_APP_STORE || {
  byContact: new Map(),
  byId: new Map(),
}

global.SMT_APP_STORE = store

export function getApplicationByContact(contact: string): ApplicationData | null {
  return store.byContact.get(contact) || null
}

export function getApplicationById(id: string): ApplicationData | null {
  return store.byId.get(id) || null
}

export function saveApplication(app: ApplicationData) {
  store.byContact.set(app.contact, app)
  store.byId.set(app.id, app)
}

export function updateApplicationStatus(id: string, status: ApplicationStatus, reason?: string) {
  const app = getApplicationById(id)
  if (!app) return null
  const updated: ApplicationData = { ...app, status, reason: reason || app.reason || '', submittedAt: app.submittedAt }
  saveApplication(updated)
  return updated
}
