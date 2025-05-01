"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Card } from "@/components/ui/card"

// Replace with your Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""

interface Location {
  id: string
  lat: number
  lng: number
  title: string
  price: number
}

interface MapViewProps {
  locations: Location[]
  center?: [number, number]
  zoom?: number
  onMarkerClick?: (location: Location) => void
}

export default function MapView({
  locations,
  center = [-74.006, 40.7128], // Default to NYC
  zoom = 12,
  onMarkerClick,
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({})

  useEffect(() => {
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center,
      zoom,
    })

    map.current.addControl(new mapboxgl.NavigationControl())

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (!map.current) return

    // Remove existing markers
    Object.values(markers.current).forEach((marker) => marker.remove())
    markers.current = {}

    // Add new markers
    locations.forEach((location) => {
      const el = document.createElement("div")
      el.className = "marker"
      el.innerHTML = `
        <div class="bg-primary text-primary-foreground px-2 py-1 rounded-md text-sm font-medium shadow-lg">
          $${location.price}
        </div>
      `

      const marker = new mapboxgl.Marker(el)
        .setLngLat([location.lng, location.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <h3 class="font-semibold">${location.title}</h3>
              <p class="text-sm">$${location.price}/hour</p>
            </div>
          `)
        )
        .addTo(map.current)

      if (onMarkerClick) {
        el.addEventListener("click", () => {
          onMarkerClick(location)
        })
      }

      markers.current[location.id] = marker
    })

    // Fit bounds to show all markers
    if (locations.length > 0) {
      const bounds = new mapboxgl.LngLatBounds()
      locations.forEach((location) => {
        bounds.extend([location.lng, location.lat])
      })
      map.current.fitBounds(bounds, { padding: 50 })
    }
  }, [locations, onMarkerClick])

  return (
    <Card>
      <div ref={mapContainer} className="w-full h-[600px] rounded-lg" />
      <style jsx global>{`
        .marker {
          cursor: pointer;
        }
        .mapboxgl-popup-content {
          padding: 0;
          border-radius: 8px;
        }
      `}</style>
    </Card>
  )