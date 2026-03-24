export default function DarkTransition() {
  return (
    <section style={{
      width: '100%',
      minHeight: '100vh',
      height: '60vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'block',
      backgroundImage: 'url(https://static.wixstatic.com/media/c837a6_02fc416d644c4f6b93a94f0dab874b8cf000.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.4)'
      }}/>
    </section>
  )
}
