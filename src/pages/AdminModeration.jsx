import { useOutletContext } from 'react-router-dom'

export default function AdminModeration(){
  const { user } = useOutletContext()
  const isAdmin = user?.role === 'admin'

  if(!isAdmin){
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        <p className="text-white/70">Admins only.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold">Moderation Dashboard</h1>

      <section className="rounded-2xl bg-white/10 border border-white/10 p-4">
        <h3 className="font-semibold mb-3">Reported Reviews</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-white/70">
                <th className="py-2 pr-4">Review</th>
                <th className="py-2 pr-4">Reporter</th>
                <th className="py-2 pr-4">Country</th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Reason</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1,2,3].map(i => (
                <tr key={i} className="border-t border-white/10">
                  <td className="py-2 pr-4">"Amazing food but crowded"</td>
                  <td className="py-2 pr-4">@user{i}</td>
                  <td className="py-2 pr-4">Japan</td>
                  <td className="py-2 pr-4">2025-11-15</td>
                  <td className="py-2 pr-4">Spam</td>
                  <td className="py-2 pr-4 space-x-2">
                    <button className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20">Approve</button>
                    <button className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20">Reject</button>
                    <button className="px-3 py-1.5 rounded-lg bg-rose-500/20 border border-rose-400/30 text-rose-200">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl bg-white/10 border border-white/10 p-4 grid md:grid-cols-3 gap-4">
        <div>
          <h3 className="font-semibold">Analytics</h3>
          <ul className="text-sm text-white/80 mt-2 space-y-1">
            <li>Total active users: 1,248</li>
            <li>Total reviews: 128,947</li>
            <li>Reports this week: 73</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold">Admin Tools</h3>
          <div className="mt-2 space-y-2">
            <button className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20">Assign badges</button>
            <button className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20">Block users</button>
            <button className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20">Edit reviews</button>
            <button className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20">Modify country info</button>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Alerts</h3>
          <ul className="text-sm text-white/80 mt-2 space-y-1">
            <li>Spike of reviews from new accounts</li>
            <li>Repeated reports on same user</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
