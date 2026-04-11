import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/config/data";
import { notFound } from "next/navigation";
import {
  Phone, ChevronRight, ArrowLeft, CheckCircle
} from "lucide-react";

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-slate-50 font-sans text-slate-900 pb-20 md:pb-0">
      
      {/* Breadcrumb & Hero */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
           <Image src={service.detailImage} alt={service.title} fill className="object-cover" />
           <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/#hizmetler" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-bold mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Hizmetlere Dön
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center`}>
              {service.icon}
            </div>
            <h1 className="text-4xl md:text-5xl font-black">{service.title}</h1>
          </div>
          <p className="text-xl text-slate-300 font-medium max-w-2xl">{service.description}</p>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="rounded-3xl overflow-hidden mb-10 shadow-xl border-8 border-white">
                <Image src={service.detailImage} alt={service.title} width={800} height={500} className="w-full h-[400px] object-cover" />
              </div>

              <h2 className="text-3xl font-black text-slate-900 mb-6">{service.title} Hizmet Detayları</h2>
              <div className="prose prose-lg prose-slate max-w-none mb-10">
                <p className="text-slate-600 leading-relaxed font-medium text-lg">
                  {service.content}
                </p>
              </div>

              <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 flex flex-col sm:flex-row items-center gap-6 justify-between">
                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-2">Hemen Destek Alın</h4>
                  <p className="text-slate-600 font-medium text-sm">Uzman ekibimiz {service.title} konusunda anında yardımcı olmaya hazır.</p>
                </div>
                <a href="tel:+905433363944" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shrink-0 flex items-center gap-2">
                  <Phone className="w-5 h-5" /> 0543 336 39 44
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl mb-8 sticky top-28">
                <h3 className="text-lg font-black text-slate-900 mb-4 pb-4 border-b border-slate-200">Diğer Hizmetlerimiz</h3>
                <ul className="space-y-2">
                  {servicesData.filter(s => s.slug !== slug).map((s, idx) => (
                    <li key={idx}>
                      <Link href={`/hizmetler/${s.slug}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-white hover:shadow-sm text-slate-600 hover:text-blue-600 font-medium transition-all group">
                        {s.title}
                        <ChevronRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <h3 className="text-lg font-black text-slate-900 mb-4">Neden Biz?</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><CheckCircle className="text-green-500 w-5 h-5 shrink-0" /> 7/24 Kesintisiz Destek</li>
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><CheckCircle className="text-green-500 w-5 h-5 shrink-0" /> %100 Memnuniyet</li>
                    <li className="flex items-center gap-3 text-sm font-bold text-slate-700"><CheckCircle className="text-green-500 w-5 h-5 shrink-0" /> Ücretsiz Keşif</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
