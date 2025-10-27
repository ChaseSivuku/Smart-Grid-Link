import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { Card } from "@/components/ui/Card"
import { ProfileDropdown } from "@/components/ProfileDropdown"
import { availableProducers } from "@/services/dummyData"
import type { EnergyProducer } from "@/types"
import { Filter, MapPin, Zap } from "lucide-react"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

// Custom marker icons for different energy types
const createCustomIcon = (type: string, available: boolean) => {
  const color = available ? (type === "solar" ? "#10b981" : type === "wind" ? "#3b82f6" : "#8b5cf6") : "#6b7280"

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        font-size: 16px;
      ">
        ${type === "solar" ? "☀️" : type === "wind" ? "💨" : type === "hydro" ? "💧" : "⚡"}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })
}

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, 13)
  }, [center, map])
  return null
}

export function CommunityMap() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedProducer, setSelectedProducer] = useState<EnergyProducer | null>(null)
  const mapRef = useRef<any>(null)

  const filteredProducers = selectedType
    ? availableProducers.filter((p) => p.energyType === selectedType)
    : availableProducers

  const handleProducerClick = (producer: EnergyProducer) => {
    setSelectedProducer(producer)
  }

  const energyTypes = [
    { type: "solar", label: "Solar", icon: "☀️", color: "bg-energy-green" },
    { type: "wind", label: "Wind", icon: "💨", color: "bg-energy-blue" },
    { type: "hydro", label: "Hydro", icon: "💧", color: "bg-primary" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Community Energy Map</h1>
              <p className="text-muted-foreground mt-1">Discover nearby renewable energy producers</p>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">San Francisco, CA</span>
            </div>
            <ProfileDropdown />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filter by Energy Type:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedType === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-card-foreground hover:bg-accent"
              }`}
            >
              All ({availableProducers.length})
            </button>
            {energyTypes.map((energy) => (
              <button
                key={energy.type}
                onClick={() => setSelectedType(energy.type)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  selectedType === energy.type
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-card-foreground hover:bg-accent"
                }`}
              >
                <span>{energy.icon}</span>
                <span>{energy.label}</span>
                <span className="text-xs opacity-75">
                  ({availableProducers.filter((p) => p.energyType === energy.type).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden h-[600px]">
              <MapContainer
                center={[37.7749, -122.4194]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                ref={mapRef}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filteredProducers.map((producer) => (
                  <Marker
                    key={producer.id}
                    position={[producer.location.lat, producer.location.lng]}
                    icon={createCustomIcon(producer.energyType, producer.available)}
                    eventHandlers={{
                      click: () => handleProducerClick(producer),
                    }}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <h3 className="font-semibold text-base mb-2">{producer.name}</h3>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="font-medium">Type:</span>{" "}
                            {producer.energyType.charAt(0).toUpperCase() + producer.energyType.slice(1)}
                          </p>
                          <p>
                            <span className="font-medium">Output:</span> {producer.currentOutput} kW
                          </p>
                          <p>
                            <span className="font-medium">Capacity:</span> {producer.capacity} kW
                          </p>
                          <p>
                            <span className="font-medium">Price:</span> R{producer.pricePerKwh}/kWh
                          </p>
                          <p>
                            <span className="font-medium">Status:</span>{" "}
                            <span className={producer.available ? "text-green-600" : "text-gray-500"}>
                              {producer.available ? "Available" : "Offline"}
                            </span>
                          </p>
                        </div>
                        {producer.available && (
                          <button className="mt-3 w-full px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">
                            Connect
                          </button>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
                {selectedProducer && (
                  <MapUpdater center={[selectedProducer.location.lat, selectedProducer.location.lng]} />
                )}
              </MapContainer>
            </Card>

            {/* Legend */}
            <Card className="mt-4 p-4">
              <h3 className="text-sm font-semibold text-card-foreground mb-3">Map Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-energy-green rounded-full flex items-center justify-center text-xs">☀️</div>
                  <span className="text-sm text-muted-foreground">Solar Energy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-energy-blue rounded-full flex items-center justify-center text-xs">💨</div>
                  <span className="text-sm text-muted-foreground">Wind Energy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs">💧</div>
                  <span className="text-sm text-muted-foreground">Hydro Energy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center text-xs">⚡</div>
                  <span className="text-sm text-muted-foreground">Offline</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar - Producer List */}
          <div className="lg:col-span-1">
            <Card className="p-6 h-[600px] overflow-y-auto">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">
                Producers ({filteredProducers.length})
              </h3>
              <div className="space-y-3">
                {filteredProducers.map((producer) => (
                  <button
                    key={producer.id}
                    onClick={() => handleProducerClick(producer)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedProducer?.id === producer.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">
                          {producer.energyType === "solar" ? "☀️" : producer.energyType === "wind" ? "💨" : "💧"}
                        </span>
                        <h4 className="font-semibold text-card-foreground text-sm">{producer.name}</h4>
                      </div>
                      {producer.available ? (
                        <span className="px-2 py-0.5 bg-energy-green/10 text-energy-green text-xs font-medium rounded-full">
                          Online
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                          Offline
                        </span>
                      )}
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{producer.location.address}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>
                          Output: <span className="text-card-foreground font-medium">{producer.currentOutput} kW</span>
                        </span>
                        <span className="text-primary font-semibold">R{producer.pricePerKwh}/kWh</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Producers</h3>
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-card-foreground">{availableProducers.length}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Online Now</h3>
              <div className="w-2 h-2 bg-energy-green rounded-full animate-pulse" />
            </div>
            <p className="text-2xl font-bold text-card-foreground">
              {availableProducers.filter((p) => p.available).length}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Total Capacity</h3>
              <Zap className="w-5 h-5 text-energy-green" />
            </div>
            <p className="text-2xl font-bold text-card-foreground">
              {availableProducers.reduce((acc, p) => acc + p.capacity, 0)} kW
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Avg Price</h3>
              <span className="text-xs text-muted-foreground">per kWh</span>
            </div>
            <p className="text-2xl font-bold text-card-foreground">
              R{(availableProducers.reduce((acc, p) => acc + p.pricePerKwh, 0) / availableProducers.length).toFixed(3)}
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
