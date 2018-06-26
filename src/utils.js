export function loadScript(src, isAsync = false) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.type = 'text/javascript'
    script.async = isAsync
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}