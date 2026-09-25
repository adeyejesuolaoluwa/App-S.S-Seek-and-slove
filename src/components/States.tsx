type StateProps = {
  title?: string
  message?: string
}

export function LoadingState({ title = 'Loading your workspace', message = 'We are getting things ready.' }: StateProps) {
  return <div className="state-panel" role="status" aria-live="polite"><span className="state-spinner" aria-hidden="true" /><strong>{title}</strong><span>{message}</span></div>
}

export function ErrorState({ title = 'Something went wrong', message = 'Please try again in a moment.' }: StateProps) {
  return <div className="state-panel state-error" role="alert"><strong>{title}</strong><span>{message}</span><button className="button button-outline" type="button">Try again</button></div>
}

export function EmptyState({ title = 'Nothing here yet', message = 'Your saved work will appear here.' }: StateProps) {
  return <div className="state-panel"><strong>{title}</strong><span>{message}</span></div>
}
