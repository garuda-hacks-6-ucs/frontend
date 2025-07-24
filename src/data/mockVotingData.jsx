const mockVotingData = [
  {
    id: 1,
    title: "Pembangunan Jembatan Penghubung Desa",
    agency: "Dinas Pekerjaan Umum Jakarta",
    budget: "150",
    deadline: Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000,
    status: "voting",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
    ],
    proposalFile: "proposal-jembatan-desa.pdf",
    description: "Proyek pembangunan jembatan penghubung desa ini bertujuan untuk meningkatkan konektivitas antar wilayah di daerah terpencil yang selama ini terisolasi. Jembatan ini akan menjadi penghubung vital bagi warga desa dalam menjalankan aktivitas ekonomi, sosial, dan pendidikan. Dengan adanya jembatan ini, distribusi barang dan mobilitas warga akan menjadi lebih cepat dan aman, serta mempercepat pertumbuhan ekonomi lokal.",
    vendors: 3
  },
  {
    id: 2,
    title: "Pembangunan Jembatan Penghubung Desa",
    agency: "Dinas Pekerjaan Umum Jakarta",
    budget: "150",
    deadline: Date.now() + 5 * 1000,
    status: "voting",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop"
    ],
    proposalFile: "proposal-jembatan-desa.pdf",
    description: "Proyek pembangunan jembatan penghubung desa ini bertujuan untuk meningkatkan konektivitas antar wilayah di daerah terpencil yang selama ini terisolasi. Jembatan ini akan menjadi penghubung vital bagi warga desa dalam menjalankan aktivitas ekonomi, sosial, dan pendidikan. Dengan adanya jembatan ini, distribusi barang dan mobilitas warga akan menjadi lebih cepat dan aman, serta mempercepat pertumbuhan ekonomi lokal.",
    vendors: 3
  },
  // Tambahkan entri tambahan sesuai kebutuhan
];

export default mockVotingData;