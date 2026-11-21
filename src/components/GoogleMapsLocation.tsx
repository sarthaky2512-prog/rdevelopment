import React, { useEffect, useState } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { ExternalLink, MapPin } from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';

interface MarkerContentProps {
  address: string;
  companyName: string;
}

interface LatLngLiteral {
  lat: number;
  lng: number;
}

interface PlaceSearchResult {
  places?: Array<{
    location?: { lat: () => number; lng: () => number } | null;
    formattedAddress?: string | null;
  }>;
}

function CliftonOfficeMapInner({ address, companyName }: MarkerContentProps) {
  const placesLib = useMapsLibrary('places');
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);
  const [position, setPosition] = useState<LatLngLiteral | null>(null);
  const [resolvedAddress, setResolvedAddress] = useState<string>(address);

  useEffect(() => {
    if (!placesLib || !placesLib.Place) return;
    let active = true;

    placesLib.Place.searchByText({
      textQuery: address,
      fields: ['location', 'formattedAddress', 'displayName'],
      maxResultCount: 1,
    })
      .then((res: PlaceSearchResult) => {
        if (!active) return;
        const first = res.places?.[0];
        if (first?.location) {
          setPosition({
            lat: first.location.lat(),
            lng: first.location.lng(),
          });
          if (first.formattedAddress) {
            setResolvedAddress(first.formattedAddress);
          }
        }
      })
      .catch(() => {
        // Fallback silently if Places quota or network fails
      });

    return () => {
      active = false;
    };
  }, [placesLib, address]);

  const mapCenter = position ?? { lat: 38.7798, lng: -77.3869 };

  return (
    <GoogleMap
      mapId="DEMO_MAP_ID"
      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      defaultCenter={mapCenter}
      center={position ?? undefined}
      defaultZoom={14}
      gestureHandling="cooperative"
      className="w-full h-full"
    >
      {position && (
        <>
          <AdvancedMarker
            ref={markerRef}
            position={position}
            title={companyName}
            onClick={() => setInfoOpen(true)}
          >
            <Pin
              background="#0B0B0C"
              borderColor="#D4AF37"
              glyphColor="#D4AF37"
              scale={1.25}
            />
          </AdvancedMarker>
          {infoOpen && marker && (
            <InfoWindow anchor={marker} onCloseClick={() => setInfoOpen(false)}>
              <div className="p-1.5 text-[#0B0B0C] max-w-[240px]">
                <div className="font-semibold text-sm mb-1">{companyName}</div>
                <p className="text-xs text-neutral-700 leading-relaxed mb-2">
                  {resolvedAddress}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    resolvedAddress
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#9A7420] underline"
                >
                  Open in Google Maps
                </a>
              </div>
            </InfoWindow>
          )}
        </>
      )}
    </GoogleMap>
  );
}

export function GoogleMapsLocation({
  quotaExceeded,
}: {
  quotaExceeded?: boolean;
}) {
  const { settings, mapsApiKey } = useSiteData();

  if (!mapsApiKey || quotaExceeded) {
    return (
      <div className="w-full h-[420px] bg-[#141416] text-[#FAFAF8] border border-white/10 flex flex-col items-center justify-center p-8 text-center">
        <MapPin className="w-9 h-9 text-[#D4AF37] mb-4" />
        <h3 className="font-display text-2xl font-semibold mb-2">
          {settings.companyName} Office
        </h3>
        <p className="text-sm text-neutral-300 max-w-md mb-6 leading-relaxed">
          {settings.address}
        </p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            settings.address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-[#0B0B0C] text-xs font-semibold uppercase tracking-wider hover:bg-[#C59B40] transition-colors"
        >
          <span>View Directions on Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  return (
    <div className="w-full h-[420px] border border-black/10 bg-[#141416] overflow-hidden">
      <APIProvider apiKey={mapsApiKey} libraries={['marker', 'places']}>
        <CliftonOfficeMapInner
          address={settings.address}
          companyName={settings.companyName}
        />
      </APIProvider>
    </div>
  );
}
