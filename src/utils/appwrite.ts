import { Client, Databases } from "appwrite"

const APPWRITE_PROJECT_ID = import.meta.env.APPWRITE_PROJECT_ID as string
export const APPWRITE_DB_ID = import.meta.env.APPWRITE_DB_ID as string

export const client = new Client().setProject(APPWRITE_PROJECT_ID)

export const db = new Databases(client)
