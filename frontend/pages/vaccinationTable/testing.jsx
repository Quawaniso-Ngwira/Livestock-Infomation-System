<PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <PrintSharp variant="contained" color="primary" {...bindTrigger(popupState)}>
            Open Popover
          </PrintSharp>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={2}>
              <Typography>The content of the Popover.</Typography>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>

    //<PrintSharp onClick={exportPDF}/>