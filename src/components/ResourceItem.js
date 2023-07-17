const ResourceItem = ({ resource }) => {
    const [expanded, setExpanded] = useState(false);
  
    const handleChange = panel => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  
    return (
      <li>
        <Accordion
          square
          expanded={expanded === `panel-${resource.id}`}
          onChange={handleChange(`panel-${resource.id}`)}
        >
          <AccordionSummary>
            <Typography>{resource.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{resource.description}</Typography>
          </AccordionDetails>
        </Accordion>
      </li>
    );
  };
  
  export default ResourceItem;