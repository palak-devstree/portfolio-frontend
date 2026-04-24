import { useEffect, useState } from 'react'
import {
  profileAPI,
  projectsAPI,
  blogAPI,
  systemDesignsAPI,
  labAPI,
  dashboardAPI,
} from './api'
import {
  fallbackProfile,
  fallbackProjects,
  fallbackBlogPosts,
  fallbackSystemDesigns,
  fallbackLabExperiments,
  fallbackDashboard,
} from './fallbackData'
import type {
  ProfileResponse,
  ProjectResponse,
  BlogPostResponse,
  SystemDesignResponse,
  LabExperimentResponse,
  DashboardResponse,
} from './types'

export interface PortfolioData {
  profile: ProfileResponse
  projects: ProjectResponse[]
  posts: BlogPostResponse[]
  systemDesigns: SystemDesignResponse[]
  experiments: LabExperimentResponse[]
  dashboard: DashboardResponse
  loading: boolean
}

function pickArray<T>(res: unknown, fallback: T[]): T[] {
  if (
    res &&
    typeof res === 'object' &&
    'data' in (res as Record<string, unknown>) &&
    Array.isArray((res as { data: unknown }).data)
  ) {
    const data = (res as { data: T[] }).data
    return data.length > 0 ? data : fallback
  }
  return fallback
}

function pickObject<T>(res: unknown, fallback: T): T {
  if (
    res &&
    typeof res === 'object' &&
    'data' in (res as Record<string, unknown>) &&
    (res as { data: unknown }).data &&
    typeof (res as { data: unknown }).data === 'object'
  ) {
    return (res as { data: T }).data
  }
  return fallback
}

export function usePortfolioData(): PortfolioData {
  const [data, setData] = useState<PortfolioData>({
    profile: fallbackProfile,
    projects: fallbackProjects,
    posts: fallbackBlogPosts,
    systemDesigns: fallbackSystemDesigns,
    experiments: fallbackLabExperiments,
    dashboard: fallbackDashboard,
    loading: true,
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      const [profileR, projectsR, postsR, designsR, labR, dashR] =
        await Promise.allSettled([
          profileAPI.get(),
          projectsAPI.list(),
          blogAPI.list(),
          systemDesignsAPI.list(),
          labAPI.list(),
          dashboardAPI.get(),
        ])

      if (cancelled) return

      setData({
        profile:
          profileR.status === 'fulfilled'
            ? pickObject<ProfileResponse>(profileR.value, fallbackProfile)
            : fallbackProfile,
        projects:
          projectsR.status === 'fulfilled'
            ? pickArray<ProjectResponse>(projectsR.value, fallbackProjects)
            : fallbackProjects,
        posts:
          postsR.status === 'fulfilled'
            ? pickArray<BlogPostResponse>(postsR.value, fallbackBlogPosts)
            : fallbackBlogPosts,
        systemDesigns:
          designsR.status === 'fulfilled'
            ? pickArray<SystemDesignResponse>(
                designsR.value,
                fallbackSystemDesigns,
              )
            : fallbackSystemDesigns,
        experiments:
          labR.status === 'fulfilled'
            ? pickArray<LabExperimentResponse>(
                labR.value,
                fallbackLabExperiments,
              )
            : fallbackLabExperiments,
        dashboard:
          dashR.status === 'fulfilled'
            ? pickObject<DashboardResponse>(dashR.value, fallbackDashboard)
            : fallbackDashboard,
        loading: false,
      })
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return data
}
