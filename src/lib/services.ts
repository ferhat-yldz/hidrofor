import React from "react";
import servicesFile from "../../content/services.json";
import type { ServiceRecord, ServiceWithIcon } from "@/types/content";
import { SERVICE_ICON_MAP, isServiceIconKey } from "@/lib/serviceIcons";

function recordToServiceWithIcon(record: ServiceRecord): ServiceWithIcon {
  const key = isServiceIconKey(record.iconKey) ? record.iconKey : "activity";
  const Icon = SERVICE_ICON_MAP[key];
  const iconClass = `w-8 h-8 ${record.iconColorClass || "text-blue-500"}`;
  return {
    title: record.title,
    slug: record.slug,
    description: record.description,
    content: record.content,
    color: record.color,
    accent: record.accent,
    image: record.image,
    detailImage: record.detailImage,
    icon: React.createElement(Icon, { className: iconClass }),
  };
}

export function getServicesWithIcons(): ServiceWithIcon[] {
  return (servicesFile.services as ServiceRecord[]).map(recordToServiceWithIcon);
}

export function getServiceRecords(): ServiceRecord[] {
  return servicesFile.services as ServiceRecord[];
}
