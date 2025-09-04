"use client";
import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "next/image";

type MapType = {
  id: number;
  name: string;
  img: string;
};

export default function Home() {
  const [maps, setMaps] = useState<MapType[]>([]);
  const [selectedMap, setSelectedMap] = useState<MapType | null>(null);
  const [showEvents, setShowEvents] = useState(false);

  // Mock API fetch (replace later with real API call)
  useEffect(() => {
    const fetchMaps = async () => {
      // simulate API response
      const data: MapType[] = [
        { id: 1, name: "Europe Trip", img: "/map1.jpg" },
        { id: 2, name: "Family History", img: "/map2.jpg" },
        { id: 3, name: "Asia Adventure", img: "/map3.jpg" },
        { id: 4, name: "Local Spots", img: "/map4.jpg" },
        { id: 5, name: "Road Trip USA", img: "/map5.jpg" },
      ];
      setMaps(data);
    };
    fetchMaps();
  }, []);

  // Create a new map placeholder
  const handleAddMap = () => {
    const newId = maps.length + 1;
    const newMap: MapType = {
      id: newId,
      name: `New Map ${newId}`,
      img: "/placeholder.jpg",
    };
    setMaps([...maps, newMap]);
    setSelectedMap(newMap);
  };

  // Group maps into chunks for carousel pages
  const mapsPerPage = 4; // Adjust based on your needs
  const allMaps = [...maps, { id: -1, name: "Add Map", img: "" }]; // Add the "Add Map" item
  const mapPages = [];
  
  for (let i = 0; i < allMaps.length; i += mapsPerPage) {
    mapPages.push(allMaps.slice(i, i + mapsPerPage));
  }

  return (
    <div className="vh-100 d-flex flex-column bg-dark text-light">
      {/* Top carousel of maps */}
      <div
        className="py-3"
        style={{
          backgroundColor: "#343a40", // dark mode
          paddingBottom: "3rem", // Extra space for indicators
        }}
      >
        <div className="container">
          <Carousel
            indicators={mapPages.length > 1}
            controls={mapPages.length > 1}
            interval={null} // Disable auto-advance
            variant="dark"
            className="map-carousel"
            style={{ paddingBottom: "2rem" }} // Space for indicators
          >
            {mapPages.map((page, pageIndex) => (
              <Carousel.Item key={pageIndex}>
                <div className="d-flex justify-content-center gap-4 px-4">
                  {page.map((map) => (
                    <div key={map.id} className="text-center">
                      {map.id === -1 ? (
                        // Add Map item
                        <div
                          onClick={handleAddMap}
                          style={{ cursor: "pointer" }}
                          className="text-center"
                        >
                          <div
                            style={{
                              width: "120px",
                              height: "80px",
                              border: "2px dashed #888",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "8px",
                              fontSize: "2rem",
                              color: "#888",
                            }}
                          >
                            +
                          </div>
                          <small className="mt-2 text-muted d-block">Add Map</small>
                        </div>
                      ) : (
                        // Regular map item
                        <div
                          onClick={() => setSelectedMap(map)}
                          style={{ cursor: "pointer" }}
                          className="text-center"
                        >
                          <Image
                            src={map.img}
                            alt={map.name}
                            width={120}
                            height={80}
                            style={{ objectFit: "cover", borderRadius: "8px" }}
                          />
                          <small className="mt-2 d-block text-light">{map.name}</small>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Fill empty slots to maintain consistent spacing */}
                  {Array.from({ length: mapsPerPage - page.length }, (_, i) => (
                    <div key={`empty-${i}`} style={{ width: "120px" }}></div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-grow-1 d-flex">
        {/* Main page content */}
        <div 
          className="p-4 d-flex justify-content-center"
          style={{ 
            width: showEvents ? "calc(100% - 350px)" : "100%",
            transition: "width 0.3s ease"
          }}
        >
          <div style={{ maxWidth: "800px", width: "100%" }}>
            {!selectedMap ? (
              <div className="text-center text-light">
                <h3>Welcome!</h3>
                <p className="text-muted">
                  Select a map above or create a new one to get started.
                </p>
                <Button variant="outline-light" onClick={handleAddMap}>
                  Create a Map
                </Button>
              </div>
            ) : (
              <Card
                className="shadow bg-secondary text-light"
                style={{ width: "100%" }}
              >
                <Image
                  src={selectedMap.img}
                  alt={selectedMap.name}
                  width={800}
                  height={400}
                  style={{
                    objectFit: "cover",
                    borderTopLeftRadius: "0.5rem",
                    borderTopRightRadius: "0.5rem",
                    width: "100%",
                    height: "400px",
                  }}
                />
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <Card.Title className="h2">{selectedMap.name}</Card.Title>
                      <Card.Text className="text-light">
                        Quick details about the map (e.g. description, events, last
                        updated). This is a larger view of your selected map with more
                        space for content and details.
                      </Card.Text>
                    </div>
                    <Button
                      variant="outline-light"
                      size="lg"
                      onClick={() => setShowEvents(true)}
                      className="ms-3"
                      style={{ 
                        fontSize: "1.5rem",
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      +
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>

        {/* Events sidebar - glued to right side */}
        <div 
          className="bg-dark border-start border-secondary d-flex flex-column"
          style={{ 
            width: showEvents ? "350px" : "0px",
            borderLeft: showEvents ? "1px solid #495057" : "none",
            transition: "width 0.3s ease",
            overflow: "hidden",
            position: "relative"
          }}
        >
          {/* Events header */}
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary" style={{ minWidth: "350px" }}>
            <h5 className="mb-0 text-light">Events</h5>
            <Button
              variant="link"
              className="text-light p-0"
              onClick={() => setShowEvents(false)}
              style={{ fontSize: "1.2rem" }}
            >
              ×
            </Button>
          </div>
          
          {/* Events content */}
          <div className="flex-grow-1 p-3 overflow-auto" style={{ minWidth: "350px" }}>
            {selectedMap ? (
              <div>
                <p className="text-muted small">
                  Events for <strong className="text-light">{selectedMap.name}</strong>
                </p>
                <div className="text-center py-4">
                  <p className="text-muted">No events yet</p>
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={() => alert("Add Event clicked!")}
                  >
                    Add First Event
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-muted">Select a map first.</p>
            )}
          </div>
        </div>
      </div>

      {/* Right-side events offcanvas - keeping for mobile fallback */}
      <Offcanvas
        show={false} // Disabled since we're using sidebar
        onHide={() => setShowEvents(false)}
        placement="end"
        className="bg-dark text-light d-md-none" // Only show on mobile if needed
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Events</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedMap ? (
            <p>
              No events for <strong>{selectedMap.name}</strong> yet.
            </p>
          ) : (
            <p>Select a map first.</p>
          )}
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => alert("Add Event clicked!")}
          >
            Add Event
          </Button>
        </Offcanvas.Body>
      </Offcanvas>

      <style jsx>{`
        .map-carousel .carousel-control-prev,
        .map-carousel .carousel-control-next {
          width: 5%;
        }
        
        .map-carousel .carousel-control-prev-icon,
        .map-carousel .carousel-control-next-icon {
          background-color: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          padding: 10px;
        }
        
        .map-carousel .carousel-indicators {
          bottom: -10px;
        }
        
        .map-carousel .carousel-indicators [data-bs-target] {
          background-color: rgba(255, 255, 255, 0.5);
        }
        
        .map-carousel .carousel-indicators .active {
          background-color: white;
        }
      `}</style>
    </div>
  );
}